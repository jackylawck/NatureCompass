/**
 * js/app.js - 應用主控制器
 */
import { i18n } from './i18n.js';

// 初始化語系
i18n.init();

// ADR-002: 安全綁定監聽，杜絕 inline handler
document.getElementById('btn-lang-zh')?.addEventListener('click', () => {
  i18n.setLocale('zh-Hant');
});

document.getElementById('btn-lang-en')?.addEventListener('click', () => {
  i18n.setLocale('en');
});

// 生產環境靜默：僅在顯式除錯標誌啟用時輸出
window.addEventListener('localeChanged', (e) => {
  if (typeof window !== 'undefined' && window.__NATURE_COMPASS_DEBUG__) {
    console.debug(`[見性羅盤] 語系切換完成: ${e.detail.locale}`);
  }
});
