/**
 * js/app.js - 見性羅盤 主控制器與狀態機
 * 職責：
 * 1. 題卡步進與作答狀態暫存 (純本機記憶體，零伺服器)
 * 2. 鍵盤快速流 (1-4 選 Most, Q-R 選 Least, Enter/Arrow 下一題)
 * 3. 呼叫 ScoringEngine 與 CompassChart 渲染報告
 * 4. 處理注意力檢查警示橫幅與多分支風格文案
 */

import { i18n } from './i18n.js';
import { questionsStructure } from './questions.js';
import { ScoringEngine } from './engine.js';
import { CompassChart } from './chart.js';

class CompassApp {
  constructor() {
    this.currentIndex = 0;
    // 作答暫存：Map<id, { most: string|null, least: string|null }>
    this.responses = new Map();
    this.assesseeName = '';
    this.isCompleted = false;

    // 初始化作答容器
    questionsStructure.forEach(q => {
      this.responses.set(q.id, { most: null, least: null });
    });
  }

  init() {
    i18n.init();
    this.bindGlobalEvents();
    this.renderCurrentQuestion();
  }

  bindGlobalEvents() {
    // 語言切換
    document.getElementById('btn-lang-zh')?.addEventListener('click', () => i18n.setLocale('zh-Hant'));
    document.getElementById('btn-lang-en')?.addEventListener('click', () => i18n.setLocale('en'));

    // 受測者姓名輸入
    const nameInput = document.getElementById('assessee-name');
    nameInput?.addEventListener('input', (e) => {
      this.assesseeName = e.target.value.trim();
    });

    // 語系變更監聽：動態重繪當前視圖
    window.addEventListener('localeChanged', () => {
      if (this.isCompleted) {
        this.renderReport();
      } else {
        this.renderCurrentQuestion();
      }
    });

    // 全局鍵盤無障礙支援
    window.addEventListener('keydown', (e) => this.handleKeyboardNav(e));
  }

  handleKeyboardNav(e) {
    if (this.isCompleted) return;
    // 忽略在輸入框內的按鍵
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    const q = questionsStructure[this.currentIndex];
    const currentResp = this.responses.get(q.id);

    // 數字鍵 1-4 選 Most (A, B, C, D)
    if (['1', '2', '3', '4'].includes(e.key)) {
      const optKey = ['A', 'B', 'C', 'D'][parseInt(e.key, 10) - 1];
      this.selectOption(q.id, 'most', optKey);
    }
    // 字母鍵 Q, W, E, R 選 Least (A, B, C, D)
    const leastKeys = { q: 'A', w: 'B', e: 'C', r: 'D', Q: 'A', W: 'B', E: 'C', R: 'D' };
    if (leastKeys[e.key]) {
      this.selectOption(q.id, 'least', leastKeys[e.key]);
    }
    // 方向鍵前進與後退
    if (e.key === 'ArrowRight' && currentResp.most && currentResp.least) {
      this.nextQuestion();
    }
    if (e.key === 'ArrowLeft' && this.currentIndex > 0) {
      this.prevQuestion();
    }
  }

  selectOption(qId, type, optKey) {
    const resp = this.responses.get(qId);
    const oppositeType = type === 'most' ? 'least' : 'most';

    // 互斥防禦：同一選項不能同時為 Most 與 Least
    if (resp[oppositeType] === optKey) {
      resp[oppositeType] = null;
    }

    resp[type] = optKey;
    this.renderCurrentQuestion();
  }

  renderCurrentQuestion() {
    const container = document.getElementById('card-viewport');
    if (!container) return;

    const q = questionsStructure[this.currentIndex];
    const total = questionsStructure.length;
    const resp = this.responses.get(q.id);
    const qData = i18n.t(`questions.q${q.id}`);

    const isFirst = this.currentIndex === 0;
    const isLast = this.currentIndex === total - 1;
    const isAnswered = resp.most !== null && resp.least !== null;

    const optionsHtml = q.options.map(opt => {
      const isMost = resp.most === opt.key;
      const isLeast = resp.least === opt.key;
      const text = qData.options?.[opt.key] || '';

      return `
        <div class="option-row ${isMost ? 'selected-most' : ''} ${isLeast ? 'selected-least' : ''}">
          <div class="option-actions" role="group" aria-label="選項 ${opt.key} 選取">
            <button type="button" 
                    class="btn-select btn-most ${isMost ? 'active' : ''}" 
                    aria-pressed="${isMost}"
                    data-q="${q.id}" data-type="most" data-key="${opt.key}">
              [+] 最符合
            </button>
            <button type="button" 
                    class="btn-select btn-least ${isLeast ? 'active' : ''}" 
                    aria-pressed="${isLeast}"
                    data-q="${q.id}" data-type="least" data-key="${opt.key}">
              [-] 最不符
            </button>
          </div>
          <div class="option-text">
            <span class="option-letter">${opt.key}.</span>
            <span class="option-desc">${text}</span>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="card-header">
        <span class="step-badge">進度：${this.currentIndex + 1} / ${total}</span>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width: ${((this.currentIndex + 1) / total) * 100}%"></div>
        </div>
      </div>
      <div class="question-body">
        <h2 class="question-prompt">${qData.prompt || ''}</h2>
        <div class="options-container">
          ${optionsHtml}
        </div>
      </div>
      <div class="card-footer">
        <button type="button" id="btn-prev" class="btn-nav" ${isFirst ? 'disabled' : ''}>上一題</button>
        ${isLast ? `
          <button type="button" id="btn-submit" class="btn-nav btn-primary" ${!isAnswered ? 'disabled' : ''}>產出探索報告</button>
        ` : `
          <button type="button" id="btn-next" class="btn-nav btn-primary" ${!isAnswered ? 'disabled' : ''}>下一題</button>
        `}
      </div>
    `;

    // 綁定選項點擊事件
    container.querySelectorAll('.btn-select').forEach(btn => {
      btn.addEventListener('click', () => {
        const qId = parseInt(btn.getAttribute('data-q'), 10);
        const type = btn.getAttribute('data-type');
        const key = btn.getAttribute('data-key');
        this.selectOption(qId, type, key);
      });
    });

    // 步進控制
    document.getElementById('btn-prev')?.addEventListener('click', () => this.prevQuestion());
    document.getElementById('btn-next')?.addEventListener('click', () => this.nextQuestion());
    document.getElementById('btn-submit')?.addEventListener('click', () => this.submitAssessment());
  }

  nextQuestion() {
    if (this.currentIndex < questionsStructure.length - 1) {
      this.currentIndex += 1;
      this.renderCurrentQuestion();
    }
  }

  prevQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
      this.renderCurrentQuestion();
    }
  }

  submitAssessment() {
    const rawResponses = Array.from(this.responses.entries()).map(([id, val]) => ({
      id,
      most: val.most,
      least: val.least
    }));

    const result = ScoringEngine.calculate(rawResponses);
    if (!result.isValid) {
      alert(`作答無效或未完成：${result.invalidReason}`);
      return;
    }

    this.isCompleted = true;
    this.assessmentResult = result;
    this.renderReport();
  }

  renderReport() {
    const container = document.getElementById('card-viewport');
    if (!container || !this.assessmentResult) return;

    const res = this.assessmentResult;
    const nameStr = this.assesseeName ? `【${this.assesseeName}】` : '';

    // 匹配主要風格文案 (單高、雙高、三高、全平手)
    let primaryMessage = '';
    const stylesStr = res.primary.join(' / ');
    if (res.primary.length === 1) {
      primaryMessage = i18n.t('ui.report.primary_single').replace('{styles}', stylesStr);
    } else if (res.primary.length === 2) {
      primaryMessage = i18n.t('ui.report.primary_double').replace('{styles}', stylesStr);
    } else if (res.primary.length === 3) {
      primaryMessage = i18n.t('ui.report.primary_triple').replace('{styles}', stylesStr);
    } else {
      primaryMessage = i18n.t('ui.report.primary_all_tie');
    }

    // 注意力檢查橫幅
    const attentionBanner = !res.attentionPassed ? `
      <div class="alert-banner warning" role="alert">
        <strong>作答有效性提示：</strong> 注意力檢驗題未依指定指令作答。本結果僅供一般參考，可能存在作答定勢或隨機點擊偏差。
      </div>
    ` : '';

    // 純 SVG 雷達圖生成
    const radarSvg = CompassChart.renderRadar(res.rawNet);

    container.innerHTML = `
      <div class="report-section print-friendly">
        ${attentionBanner}
        
        <div class="report-header">
          <h2>${nameStr} 見性羅盤・行為偏好探索報告</h2>
          <p class="timestamp">完成時間：${new Date().toLocaleString()}</p>
        </div>

        <div class="summary-card">
          <p class="primary-summary"><strong>${primaryMessage}</strong></p>
        </div>

        <div class="report-grid">
          <div class="radar-box">
            ${radarSvg}
          </div>

          <div class="metrics-box">
            <h3>${i18n.t('ui.report.ranking_title')}</h3>
            <ul class="rank-list">
              ${res.ranking.map(r => `
                <li>
                  <span class="rank-num">第 ${r.rank} 名</span>
                  <span class="rank-dim">${r.dim}</span>
                  <span class="rank-score">淨分 ${r.score > 0 ? `+${r.score}` : r.score}</span>
                  ${r.isTie ? `<span class="tie-tag">${i18n.t('ui.report.tie_notice')}</span>` : ''}
                </li>
              `).join('')}
            </ul>

            <h3>${i18n.t('ui.report.weights_title')}</h3>
            <div class="weight-bars">
              ${['D', 'I', 'S', 'C'].map(dim => `
                <div class="weight-item">
                  <span class="weight-dim">${dim}</span>
                  <div class="weight-bar-bg">
                    <div class="weight-bar-fill" style="width: ${res.weights[dim]}%"></div>
                  </div>
                  <span class="weight-pct">${res.weights[dim]}%</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="disclaimer-footer">
          <p>${i18n.t('ui.report.disclaimer')}</p>
        </div>

        <div class="report-actions">
          <button type="button" class="btn-action" onclick="window.print()">列印 / 匯出 PDF</button>
          <button type="button" id="btn-restart" class="btn-action secondary">重新探索</button>
        </div>
      </div>
    `;

    document.getElementById('btn-restart')?.addEventListener('click', () => {
      this.isCompleted = false;
      this.currentIndex = 0;
      this.responses.forEach((_, k) => this.responses.set(k, { most: null, least: null }));
      this.renderCurrentQuestion();
    });
  }
}

// 頂層啟動應用
const app = new CompassApp();
app.init();
