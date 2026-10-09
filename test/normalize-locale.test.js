import test from 'node:test';
import assert from 'node:assert';
import { normalizeLocale } from '../js/locale-utils.js';

test('ADR-004: normalizeLocale 基礎與邊界測試全覆蓋', () => {
  // 1. 下劃線容錯 (WebView / URL 參數 / 舊版系統)
  assert.strictEqual(normalizeLocale('zh_TW'), 'zh-Hant');
  assert.strictEqual(normalizeLocale('zh_HK'), 'zh-Hant');
  assert.strictEqual(normalizeLocale('zh_MO'), 'zh-Hant');
  assert.strictEqual(normalizeLocale('zh_CN'), 'zh-Hans');
  assert.strictEqual(normalizeLocale('zh_SG'), 'zh-Hans');
  assert.strictEqual(normalizeLocale('  zh_HK  '), 'zh-Hant', '前後帶空白且帶下劃線容錯');

  // 2. 帶擴展子標籤 (Extension / Private Use Subtags)
  assert.strictEqual(normalizeLocale('zh-HK-x-foo'), 'zh-Hant');
  assert.strictEqual(normalizeLocale('zh-TW-u-nu-hanidec'), 'zh-Hant');
  assert.strictEqual(normalizeLocale('zh-Hans-CN-u-ca-chinese'), 'zh-Hans');

  // 3. 矛盾組合與明確 Script 優先權 (ADR-004 規範)
  assert.strictEqual(normalizeLocale('zh-Hant-CN'), 'zh-Hant', 'Script 優先：在 CN 地區仍為 Hant');
  assert.strictEqual(normalizeLocale('zh-Hans-TW'), 'zh-Hans', 'Script 優先：在 TW 地區仍為 Hans');
  assert.strictEqual(normalizeLocale('zh-Hans-HK'), 'zh-Hans', 'Script 優先：在 HK 地區仍為 Hans');

  // 4. ADR-004 明文規定：裸 zh 或無 region 之中文回退
  assert.strictEqual(normalizeLocale('zh'), 'zh-Hant');
  assert.strictEqual(normalizeLocale('ZH'), 'zh-Hant');
  assert.strictEqual(normalizeLocale('zh-Hant'), 'zh-Hant');
  assert.strictEqual(normalizeLocale('zh-Hans'), 'zh-Hans');

  // 5. 擴展語言標籤 (Extlang Tags)
  assert.strictEqual(normalizeLocale('zh-cmn-Hant'), 'zh-Hant');
  assert.strictEqual(normalizeLocale('zh-cmn-Hans'), 'zh-Hans');

  // 6. 非法與各類邊界安全回退至 en
  assert.strictEqual(normalizeLocale(''), 'en');
  assert.strictEqual(normalizeLocale('    '), 'en');
  assert.strictEqual(normalizeLocale(null), 'en');
  assert.strictEqual(normalizeLocale(undefined), 'en');
  assert.strictEqual(normalizeLocale(12345), 'en');
  assert.strictEqual(normalizeLocale({}), 'en');
  assert.strictEqual(normalizeLocale('en-US'), 'en');
  assert.strictEqual(normalizeLocale('ja-JP'), 'en');
  assert.strictEqual(normalizeLocale('fr-FR'), 'en');
  assert.strictEqual(normalizeLocale('zhhant'), 'en', '非合法 BCP-47');
});
