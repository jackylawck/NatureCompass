/**
 * test/questions-integrity.test.js - 題庫資料層完整性與計量契約測試
 */
import test from 'node:test';
import assert from 'node:assert';
import { questionsStructure } from '../js/questions.js';

test('資料層契約：題庫基本結構與 ID 連續性', () => {
  assert.ok(Array.isArray(questionsStructure), 'questionsStructure 必須為陣列');
  assert.strictEqual(questionsStructure.length, 25, '題庫總題數必須嚴格等於 25 題');

  questionsStructure.forEach((q, index) => {
    assert.strictEqual(q.id, index + 1, `題目 ID 必須由 1 起連續遞增，第 ${index + 1} 筆 ID 異常`);
    assert.ok(['forced_choice', 'attention_check'].includes(q.type), `第 ${q.id} 題型態無效: ${q.type}`);
  });
});

test('資料層契約：所有題目的選項鍵必須嚴格為 A, B, C, D 字典順序', () => {
  questionsStructure.forEach(q => {
    const keys = q.options.map(o => o.key);
    assert.deepStrictEqual(
      keys,
      ['A', 'B', 'C', 'D'],
      `第 ${q.id} 題選項 key 順序或數量異常`
    );
  });
});

test('心理計量契約：前 24 題迫選題必須嚴格涵蓋且唯一包含 D, I, S, C 四維度', () => {
  const forcedChoiceQuestions = questionsStructure.filter(q => q.type !== 'attention_check');
  assert.strictEqual(forcedChoiceQuestions.length, 24, '常規迫選題必須為 24 題');

  forcedChoiceQuestions.forEach(q => {
    const dims = q.options.map(o => o.dim).sort();
    assert.deepStrictEqual(
      dims,
      ['C', 'D', 'I', 'S'],
      `第 ${q.id} 題維度配置不完整或有重複，當前為: ${q.options.map(o => o.dim).join(', ')}`
    );
  });
});

test('題庫契約：attention_check 必須具備合法的 expected.most (least 允許為 null)', () => {
  const checkItems = questionsStructure.filter(q => q.type === 'attention_check');
  assert.strictEqual(checkItems.length, 1, '目前架構應精確包含 1 題注意力檢查題');

  checkItems.forEach(q => {
    const validKeys = q.options.map(o => o.key);
    
    // Most 必須為 A, B, C, D 其中之一
    assert.strictEqual(typeof q.expected?.most, 'string', `第 ${q.id} 題缺少有效的 expected.most`);
    assert.ok(
      validKeys.includes(q.expected.most),
      `第 ${q.id} 題 expected.most "${q.expected.most}" 不在題目選項內`
    );

    // Least 必須為 null 或有效鍵
    assert.ok(
      q.expected?.least === null || (typeof q.expected?.least === 'string' && validKeys.includes(q.expected.least)),
      `第 ${q.id} 題 expected.least 必須為 null 或有效選項鍵`
    );
  });
});
