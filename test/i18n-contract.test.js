import { readFileSync } from 'fs';
import { resolve } from 'path';
import { JSDOM } from 'jsdom';
import test from 'node:test';
import assert from 'node:assert';

test('ADR-003: [data-i18n] 必須是純文字葉節點，嚴禁沖刷子節點', () => {
  const html = readFileSync(resolve(process.cwd(), 'index.html'), 'utf-8');
  const dom = new JSDOM(html);
  const elements = dom.window.document.querySelectorAll('[data-i18n]');

  elements.forEach((el) => {
    assert.strictEqual(
      el.children.length,
      0,
      `[data-i18n] 節點不能包含子元素: <${el.tagName.toLowerCase()} data-i18n="${el.getAttribute('data-i18n')}">${el.innerHTML}</${el.tagName.toLowerCase()}>`
    );
  });
});

test('ADR-003: [data-i18n-attr] 屬性語法必須具備合法的冒號分隔', () => {
  const html = readFileSync(resolve(process.cwd(), 'index.html'), 'utf-8');
  const dom = new JSDOM(html);
  const elements = dom.window.document.querySelectorAll('[data-i18n-attr]');

  elements.forEach((el) => {
    const rawSpec = el.getAttribute('data-i18n-attr');
    const colonIndex = rawSpec.indexOf(':');
    assert.notStrictEqual(
      colonIndex,
      -1,
      `[data-i18n-attr] 缺少冒號分隔 (attr:key): "${rawSpec}" 在 <${el.tagName.toLowerCase()}>`
    );
    const attr = rawSpec.substring(0, colonIndex).trim();
    const key = rawSpec.substring(colonIndex + 1).trim();
    assert.ok(attr.length > 0, `[data-i18n-attr] 屬性名稱不可為空: "${rawSpec}"`);
    assert.ok(key.length > 0, `[data-i18n-attr] 字典鍵名不可為空: "${rawSpec}"`);
  });
});
