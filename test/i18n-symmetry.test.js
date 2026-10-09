/**
 * test/i18n-symmetry.test.js - ADR-005 雙語字典結構對稱性與值完整性契約測試
 */
import test from 'node:test';
import assert from 'node:assert';
import { dictionaries } from '../js/i18n.js';

function extractKeys(obj, prefix = '') {
  let keys = [];
  if (!obj || typeof obj !== 'object') return keys;

  for (const [key, value] of Object.entries(obj)) {
    const fullPath = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      keys = keys.concat(extractKeys(value, fullPath));
    } else {
      keys.push(fullPath);
    }
  }
  return keys.sort();
}

test('ADR-005: 繁中 (zh-Hant) 與英文 (en) 雙語字典 Key-Path 100% 對稱校驗', () => {
  const zhKeys = extractKeys(dictionaries['zh-Hant']);
  const enKeys = extractKeys(dictionaries['en']);

  // 1. 防禦空字典假綠燈：確保題庫、UI、特質字典皆已真實載入
  assert.ok(zhKeys.length > 50, `zh-Hant 字典鍵數量異常過少 (${zhKeys.length})，疑為空檔案`);
  assert.ok(enKeys.length > 50, `en 字典鍵數量異常過少 (${enKeys.length})，疑為空檔案`);

  // 2. 雙向對稱性比對
  const missingInEn = zhKeys.filter(k => !enKeys.includes(k));
  const missingInZh = enKeys.filter(k => !zhKeys.includes(k));

  assert.deepStrictEqual(missingInEn, [], `英文字典缺失鍵:\n${missingInEn.join('\n')}`);
  assert.deepStrictEqual(missingInZh, [], `繁中字典缺失鍵:\n${missingInZh.join('\n')}`);
  
  // 3. 確保全集完全一致
  assert.deepStrictEqual(zhKeys, enKeys, '繁中與英文字典鍵集合不完全一致');
});

test('ADR-005: 檢查所有字典葉節點值均為非空字串 (防假綠燈)', () => {
  assert.ok(dictionaries['zh-Hant'], '缺少 zh-Hant 字典根節點');
  assert.ok(dictionaries['en'], '缺少 en 字典根節點');

  for (const [lang, dict] of Object.entries(dictionaries)) {
    const keys = extractKeys(dict);
    assert.ok(keys.length > 0, `[${lang}] 字典不能為空`);

    keys.forEach(k => {
      const v = k.split('.').reduce((o, key) => o?.[key], dict);
      assert.ok(
        typeof v === 'string' && v.trim().length > 0,
        `[${lang}] 鍵 "${k}" 值為空、全空白或非字串 (型別: ${typeof v})`
      );
    });
  }
});
