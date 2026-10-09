/**
 * js/i18n.js - 見性羅盤 雙語分發核心
 */
import { normalizeLocale } from './locale-utils.js';
import zhUI from '../locales/zh-Hant/ui.js';
import enUI from '../locales/en/ui.js';
import zhQuestions from '../locales/zh-Hant/questions.js';
import enQuestions from '../locales/en/questions.js';
import zhProfiles from '../locales/zh-Hant/profiles.js';
import enProfiles from '../locales/en/profiles.js';

export const dictionaries = {
  'zh-Hant': { ui: zhUI, questions: zhQuestions, profiles: zhProfiles },
  'en': { ui: enUI, questions: enQuestions, profiles: enProfiles }
};

class I18nManager {
  constructor() {
    let saved = null;
    let browserLang = 'en';

    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      try {
        saved = localStorage.getItem('nature_compass_locale');
      } catch (e) {
        // localStorage 降級處理
      }
      browserLang = navigator?.language || 'en';
    }

    const detected = normalizeLocale(saved || browserLang);
    this.currentLocale = detected === 'zh-Hans' ? 'zh-Hant' : detected;
  }

  /**
   * 取得字典項目
   * 支援回傳純文字字串，亦支援回傳題庫結構物件 (如 questions.q1)
   * 若查無資料則安全 fallback 回傳傳入的 path
   */
  t(path) {
    if (!path || typeof path !== 'string') return '';
    const activeDict = dictionaries[this.currentLocale] ?? dictionaries['en'];
    const resolved = path.split('.').reduce((obj, key) => obj?.[key], activeDict);

    // 只要有解析出有效內容（包含 string 或 object），均予返回
    return (resolved !== undefined && resolved !== null) ? resolved : path;
  }

  setLocale(locale) {
    const target = normalizeLocale(locale);
    this.currentLocale = target === 'zh-Hans' ? 'zh-Hant' : target;

    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('nature_compass_locale', this.currentLocale);
      } catch (e) {}
    }

    if (typeof document !== 'undefined') {
      document.documentElement.lang = this.currentLocale;
      const metaTitle = this.t('ui.meta.title');
      if (typeof metaTitle === 'string') {
        document.title = metaTitle;
      }

      // 靜態葉節點文本替換 (確保僅在取回字串時更新，防止物件破壞 DOM)
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const val = this.t(key);
        if (typeof val === 'string') {
          el.textContent = val;
        }
      });

      // 標籤屬性替換 (例如 placeholder:ui.form.name_placeholder)
      document.querySelectorAll('[data-i18n-attr]').forEach(el => {
        const rawSpec = el.getAttribute('data-i18n-attr');
        const colonIndex = rawSpec.indexOf(':');
        if (colonIndex !== -1) {
          const attr = rawSpec.substring(0, colonIndex).trim();
          const key = rawSpec.substring(colonIndex + 1).trim();
          const val = this.t(key);
          if (typeof val === 'string') {
            el.setAttribute(attr, val);
          }
        }
      });
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('localeChanged', {
        detail: { locale: this.currentLocale }
      }));
    }
  }

  init() {
    this.setLocale(this.currentLocale);
  }
}

export const i18n = new I18nManager();
