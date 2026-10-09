/**
 * js/engine.js - 見性羅盤確定性計分核心
 * 
 * 架構分層：
 * 1. calculate(responses): 輸入校驗、作答合法性審計、提取 rawNet
 * 2. rankAndWeigh(rawNet): 純數學映射、全維度型別契約、最大餘數法百分比、同分確定性排序
 */

import { questionsStructure } from './questions.js';

export class ScoringEngine {
  /**
   * 第一層：解析作答並提取原始淨分 (含單向注意力檢查支援)
   * @param {Array<{ id: number, most: string, least: string|null }>} responses
   */
  static calculate(responses) {
    if (!Array.isArray(responses) || responses.length === 0) {
      return { isValid: false, invalidReason: 'EMPTY_RESPONSES' };
    }

    const rawCounts = {
      D: { most: 0, least: 0 },
      I: { most: 0, least: 0 },
      S: { most: 0, least: 0 },
      C: { most: 0, least: 0 }
    };

    let attentionPassed = true;
    const qMap = new Map(questionsStructure.map(q => [q.id, q]));

    for (const resp of responses) {
      const q = qMap.get(resp.id);
      if (!q) continue;

      // 注意力校驗題處理 (支援單向 Most 檢查契約)
      if (q.type === 'attention_check') {
        const expectedMost = q.expected?.most;
        const expectedLeast = q.expected?.least;

        // Most 為必填錨點
        if (expectedMost === null || expectedMost === undefined || typeof expectedMost !== 'string') {
          return { isValid: false, invalidReason: `MISSING_EXPECTED_MOST_AT_Q${resp.id}` };
        }

        if (resp.most !== expectedMost) {
          attentionPassed = false;
        }

        // Least 為可選：僅在明確定義字串時進行校驗 (null / undefined 視為不檢查)
        const checkLeast = expectedLeast !== null && expectedLeast !== undefined;
        if (checkLeast && resp.least !== expectedLeast) {
          attentionPassed = false;
        }
        
        continue;
      }

      // 常規題檢查 1: 同題 Most 與 Least 絕不可相同
      if (resp.most && resp.least && resp.most === resp.least) {
        return { isValid: false, invalidReason: `IDENTICAL_CHOICE_AT_Q${resp.id}` };
      }

      // 常規題檢查 2: 防禦無效 key 或遺漏作答（防靜默跳過導致淨偏好不為 0）
      const mostOpt = q.options.find(o => o.key === resp.most);
      const leastOpt = q.options.find(o => o.key === resp.least);

      if (!mostOpt || !leastOpt) {
        return { isValid: false, invalidReason: `INVALID_OPTION_AT_Q${resp.id}` };
      }

      rawCounts[mostOpt.dim].most += 1;
      rawCounts[leastOpt.dim].least += 1;
    }

    // 計算原始淨偏好
    const rawNet = {
      D: rawCounts.D.most - rawCounts.D.least,
      I: rawCounts.I.most - rawCounts.I.least,
      S: rawCounts.S.most - rawCounts.S.least,
      C: rawCounts.C.most - rawCounts.C.least
    };

    // 檢查 3: 數學守恆硬約束 (4 維淨分總和必須嚴格等於 0)
    const netSum = rawNet.D + rawNet.I + rawNet.S + rawNet.C;
    if (netSum !== 0) {
      return { isValid: false, invalidReason: `NET_SUM_NOT_ZERO:${netSum}` };
    }

    // 調用純數學分層
    const mathResult = ScoringEngine.rankAndWeigh(rawNet);

    return {
      ...mathResult,
      attentionPassed,
      isValid: true
    };
  }

  /**
   * 第二層：純數學映射（全維度嚴格型別校驗）
   * @param {{ D: number, I: number, S: number, C: number }} rawNet
   */
  static rankAndWeigh(rawNet) {
    if (!rawNet || typeof rawNet !== 'object') {
      throw new TypeError('rankAndWeigh requires a rawNet object');
    }

    // 嚴格維度契約：D, I, S, C 必須齊全且為數值
    const requiredDims = ['D', 'I', 'S', 'C'];
    if (!requiredDims.every(d => typeof rawNet[d] === 'number' && !Number.isNaN(rawNet[d]))) {
      throw new TypeError('rankAndWeigh requires numeric D, I, S, C fields');
    }

    // 1. 基線平移 +24，映射至 [0, 48]，總基數恆為 96
    const shifted = {
      D: rawNet.D + 24,
      I: rawNet.I + 24,
      S: rawNet.S + 24,
      C: rawNet.C + 24
    };
    const totalShifted = shifted.D + shifted.I + shifted.S + shifted.C;

    // 2. 最大餘數法（Largest Remainder Method）整數百分比化
    const rawWeights = {
      D: (shifted.D / totalShifted) * 100,
      I: (shifted.I / totalShifted) * 100,
      S: (shifted.S / totalShifted) * 100,
      C: (shifted.C / totalShifted) * 100
    };

    const flooredWeights = {
      D: Math.floor(rawWeights.D),
      I: Math.floor(rawWeights.I),
      S: Math.floor(rawWeights.S),
      C: Math.floor(rawWeights.C)
    };

    const currentSum = flooredWeights.D + flooredWeights.I + flooredWeights.S + flooredWeights.C;
    const remainder = 100 - currentSum;

    const fractionList = Object.keys(rawWeights).map(k => ({
      dim: k,
      fraction: rawWeights[k] - flooredWeights[k]
    })).sort((a, b) => b.fraction - a.fraction);

    for (let i = 0; i < remainder; i++) {
      flooredWeights[fractionList[i].dim] += 1;
    }

    // 3. 序數排名與平手處理 (加入二級字母排序，保證平手時確定性輸出)
    const sortedDims = Object.entries(rawNet)
      .map(([dim, score]) => ({ dim, score }))
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        return a.dim.localeCompare(b.dim); // 同分時按 C < D < I < S 嚴格字母序排序
      });

    const ranking = [];
    let currentRank = 1;
    for (let i = 0; i < sortedDims.length; i++) {
      const isTieWithPrev = i > 0 && sortedDims[i].score === sortedDims[i - 1].score;
      const isTieWithNext = i < sortedDims.length - 1 && sortedDims[i].score === sortedDims[i + 1].score;
      const isTie = isTieWithPrev || isTieWithNext;

      if (!isTieWithPrev) {
        currentRank = i + 1;
      }

      ranking.push({
        dim: sortedDims[i].dim,
        score: sortedDims[i].score,
        rank: currentRank,
        isTie
      });
    }

    const maxScore = sortedDims[0].score;
    // primary 維度列表自動保證依字母順序排列
    const primary = sortedDims
      .filter(d => d.score === maxScore)
      .map(d => d.dim)
      .sort();

    return {
      ranking,
      weights: flooredWeights,
      rawNet,
      primary
    };
  }
}
