import test from 'node:test';
import assert from 'node:assert';
import { normalizeLocale } from '../js/locale-utils.js';

test('ADR-004: normalizeLocale 邊界與型別防禦驗證', () => {
  assert.strictEqual(normalizeLocale('zh-HK'), 'zh-Hant');
  assert.strictEqual(normalizeLocale('zh-TW'), 'zh-Hant');
  assert.strictEqual(normalizeLocale('zh-MO'), 'zh-Hant');
  assert.strictEqual(normalizeLocale('zh-CN'), 'zh-Hans');
  assert.strictEqual(normalizeLocale('zh-SG'), 'zh-Hans');

  assert.strictEqual(normalizeLocale('zh-Hant-HK'), 'zh-Hant');
  assert.strictEqual(normalizeLocale('zh-Hans-CN'), 'zh-Hans');

  assert.strictEqual(normalizeLocale('zh'), 'zh-Hant');
  assert.strictEqual(normalizeLocale('ZH'), 'zh-Hant');
  assert.strictEqual(normalizeLocale('en'), 'en');
  assert.strictEqual(normalizeLocale('en-US'), 'en');
  assert.strictEqual(normalizeLocale('ja-JP'), 'en');

  assert.strictEqual(normalizeLocale(''), 'en');
  assert.strictEqual(normalizeLocale('   '), 'en');
  assert.strictEqual(normalizeLocale(null), 'en');
  assert.strictEqual(normalizeLocale(undefined), 'en');
  assert.strictEqual(normalizeLocale(12345), 'en');
  assert.strictEqual(normalizeLocale({}), 'en');
  assert.strictEqual(normalizeLocale(['zh-HK']), 'en');
});
