import test from 'node:test';
import assert from 'node:assert';
import { dictionaries } from '../js/i18n.js';

function extractKeys(obj, prefix = '') {
  let keys = [];
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

  const missingInEn = zhKeys.filter(k => !enKeys.includes(k));
  const missingInZh = enKeys.filter(k => !zhKeys.includes(k));

  assert.deepStrictEqual(missingInEn, [], `英文缺失鍵: ${missingInEn.join(', ')}`);
  assert.deepStrictEqual(missingInZh, [], `繁中缺失鍵: ${missingInZh.join(', ')}`);
});

test('ADR-005: 檢查所有字典葉節點值均為非空字串 (防假綠燈)', () => {
  for (const [lang, dict] of Object.entries(dictionaries)) {
    const keys = extractKeys(dict);
    keys.forEach(k => {
      const v = k.split('.').reduce((o, key) => o?.[key], dict);
      assert.ok(
        typeof v === 'string' && v.trim().length > 0,
        `[${lang}] 鍵 "${k}" 值為空或非字串`
      );
    });
  }
});
