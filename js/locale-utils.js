/**
 * js/locale-utils.js - 純函數 Locale 正規化工具 (Node / Browser 雙環境相容)
 */

/**
 * ADR-004: 規範化 Locale 判定純函數
 * @param {unknown} raw - 任意輸入
 * @returns {'zh-Hant' | 'zh-Hans' | 'en'}
 */
export function normalizeLocale(raw) {
  if (typeof raw !== 'string') {
    return 'en';
  }

  const tag = raw.trim().toLowerCase();
  if (!tag) {
    return 'en';
  }

  // 繁體標記 (含裸 zh 依照專案定位回退為 zh-Hant)
  if (
    tag.startsWith('zh-hant') || 
    tag === 'zh-tw' || 
    tag === 'zh-hk' || 
    tag === 'zh-mo' ||
    tag === 'zh'
  ) {
    return 'zh-Hant';
  }

  // 簡體標記
  if (
    tag.startsWith('zh-hans') || 
    tag === 'zh-cn' || 
    tag === 'zh-sg'
  ) {
    return 'zh-Hans';
  }

  return 'en';
}
