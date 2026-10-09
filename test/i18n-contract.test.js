/**
 * test/i18n-contract.test.js - ADR-003 DOM 國際化契約測試
 */
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { JSDOM } from 'jsdom';
import test from 'node:test';
import assert from 'node:assert';
import zhUI from '../locales/zh-Hant/ui.js';
import enUI from '../locales/en/ui.js';

// 輔助函式：安全解析點分隔路徑
function resolveDictPath(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

test('ADR-003: [data-i18n] 必須是純文字葉節點，且鍵值必須在字典中真實存在', () => {
  const html = readFileSync(resolve(process.cwd(), 'index.html'), 'utf-8');
  const dom = new JSDOM(html);
  const elements = dom.window.document.querySelectorAll('[data-i18n]');

  // 1. 防禦假綠燈：必須檢測到實體節點
  assert.ok(elements.length > 0, 'index.html 中必須包含至少一個 [data-i18n] 節點');

  elements.forEach((el) => {
    const key = el.getAttribute('data-i18n');

    // 2. 葉節點契約：嚴禁包含任何子元素標籤
    assert.strictEqual(
      el.children.length,
      0,
      `[data-i18n] 節點不能包含子元素: <${el.tagName.toLowerCase()} data-i18n="${key}">${el.innerHTML}</${el.tagName.toLowerCase()}>`
    );

    // 3. 鍵值真實性契約：必須在 zh-Hant 與 en 字典中為非空字串
    const zhVal = resolveDictPath({ ui: zhUI }, key);
    const enVal = resolveDictPath({ ui: enUI }, key);

    assert.ok(
      typeof zhVal === 'string' && zhVal.trim().length > 0,
      `[data-i18n] 鍵值 "${key}" 在 locales/zh-Hant/ui.js 中不存在或為空`
    );
    assert.ok(
      typeof enVal === 'string' && enVal.trim().length > 0,
      `[data-i18n] 鍵值 "${key}" 在 locales/en/ui.js 中不存在或為空`
    );
  });
});

test('ADR-003: [data-i18n-attr] 屬性語法必須合法，且綁定之鍵值必須真實存在', () => {
  const html = readFileSync(resolve(process.cwd(), 'index.html'), 'utf-8');
  const dom = new JSDOM(html);
  const elements = dom.window.document.querySelectorAll('[data-i18n-attr]');

  // 1. 防禦假綠燈
  assert.ok(elements.length > 0, 'index.html 中必須包含至少一個 [data-i18n-attr] 節點');

  elements.forEach((el) => {
    const rawSpec = el.getAttribute('data-i18n-attr');
    const colonIndex = rawSpec.indexOf(':');

    // 2. 語法結構契約
    assert.notStrictEqual(
      colonIndex,
      -1,
      `[data-i18n-attr] 缺少冒號分隔 (attr:key): "${rawSpec}" 在 <${el.tagName.toLowerCase()}>`
    );

    const attr = rawSpec.substring(0, colonIndex).trim();
    const key = rawSpec.substring(colonIndex + 1).trim();

    assert.ok(attr.length > 0, `[data-i18n-attr] 屬性名稱不可為空: "${rawSpec}"`);
    assert.ok(key.length > 0, `[data-i18n-attr] 字典鍵名不可為空: "${rawSpec}"`);

    // 3. 鍵值真實性契約
    const zhVal = resolveDictPath({ ui: zhUI }, key);
    const enVal = resolveDictPath({ ui: enUI }, key);

    assert.ok(
      typeof zhVal === 'string' && zhVal.trim().length > 0,
      `[data-i18n-attr] 鍵值 "${key}" 在 locales/zh-Hant/ui.js 中不存在或為空`
    );
    assert.ok(
      typeof enVal === 'string' && enVal.trim().length > 0,
      `[data-i18n-attr] 鍵值 "${key}" 在 locales/en/ui.js 中不存在或為空`
    );
  });
});
