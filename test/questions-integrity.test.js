import test from 'node:test';
import assert from 'node:assert';
import { questionsStructure } from '../js/questions.js';

test('資料層契約：所有題目的選項鍵必須嚴格為 A, B, C, D 字典順序', () => {
  questionsStructure.forEach(q => {
    const keys = q.options.map(o => o.key);
    assert.deepStrictEqual(
      keys,
      ['A', 'B', 'C', 'D'],
      `第 ${q.id} 題選項 key 順序異常`
    );
  });
});

test('題庫契約：attention_check 必須具備 expected.most (least 允許為 null)', () => {
  const checkItems = questionsStructure.filter(q => q.type === 'attention_check');
  assert.ok(checkItems.length > 0, '題庫中必須包含至少 1 題注意力檢查題');

  checkItems.forEach(q => {
    assert.strictEqual(typeof q.expected?.most, 'string', `第 ${q.id} 題缺少有效的 expected.most`);
    assert.ok(
      q.expected?.least === null || typeof q.expected?.least === 'string',
      `第 ${q.id} 題 expected.least 必須為字串或 null`
    );
  });
});
