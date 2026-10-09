/**
 * js/locale-utils.js - 純函數 Locale 正規化工具 (Node / Browser 雙環境相容)
 * 
 * 架構決策 (ADR-004)：
 * 1. 依靠 ECMAScript 原生 Intl.Locale 進行標準 BCP-47 解析（支援下劃線相容與擴展標籤）。
 * 2. 裸「zh」依照專案定位（香港/繁中基底）回退為「zh-Hant」。
 * 3. 明確之書寫系統（script）優先於地區（region）。
 */

/**
 * @param {unknown} raw - 任意輸入
 * @returns {'zh-Hant' | 'zh-Hans' | 'en'}
 */
export function normalizeLocale(raw) {
  if (typeof raw !== 'string') {
    return 'en';
  }

  // 容錯防禦：去除空白並統一將下劃線替換為連字號 (zh_HK -> zh-hk)
  const tag = raw.trim().replace(/_/g, '-').toLowerCase();
  if (!tag) {
    return 'en';
  }

  // ADR-004 專案方針：裸 zh 預設為繁體中文
  if (tag === 'zh') {
    return 'zh-Hant';
  }

  let locale;
  try {
    locale = new Intl.Locale(tag);
  } catch {
    return 'en'; // 非法 BCP-47 語法，安全回退
  }

  // 非中文一律回退至 en
  if (locale.language !== 'zh') {
    return 'en';
  }

  // 1. 書寫系統 (Script) 優先權最高 (例如 zh-Hans-HK 依然判定為 zh-Hans)
  const script = (locale.script || '').toLowerCase();
  if (script === 'hans') return 'zh-Hans';
  if (script === 'hant') return 'zh-Hant';

  // 2. 若無明確 Script，依地區 (Region) 判定
  const region = (locale.region || '').toLowerCase();
  if (['tw', 'hk', 'mo'].includes(region)) return 'zh-Hant';
  if (['cn', 'sg'].includes(region)) return 'zh-Hans';

  // 3. 無 Script 且無對應 Region 時，依專案預設回退為繁體中文
  return 'zh-Hant';
}
