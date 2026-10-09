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
        // localStorage 被封鎖時靜默降級至記憶體狀態
      }
      browserLang = navigator?.language || 'en';
    }

    const detected = normalizeLocale(saved || browserLang);
    this.currentLocale = detected === 'zh-Hans' ? 'zh-Hant' : detected;
  }

  /**
   * 字串取值方法（嚴格型別校驗防禦空字串與非字串）
   */
  t(path) {
    const activeDict = dictionaries[this.currentLocale] ?? dictionaries['en'];
    const resolved = path.split('.').reduce((obj, key) => obj?.[key], activeDict);
    return (typeof resolved === 'string' && resolved.length > 0) ? resolved : path;
  }

  setLocale(locale) {
    const target = normalizeLocale(locale);
    this.currentLocale = target === 'zh-Hans' ? 'zh-Hant' : target;

    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('nature_compass_locale', this.currentLocale);
      } catch (e) {
        // 忽略無寫入權限異常
      }
    }

    if (typeof document !== 'undefined') {
      document.documentElement.lang = this.currentLocale;
      document.title = this.t('ui.meta.title');

      // ADR-003: 替換純文字葉節點
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = this.t(key);
      });

      // 替換 ARIA 屬性與 placeholder
      document.querySelectorAll('[data-i18n-attr]').forEach(el => {
        const rawSpec = el.getAttribute('data-i18n-attr');
        const colonIndex = rawSpec.indexOf(':');
        if (colonIndex !== -1) {
          const attr = rawSpec.substring(0, colonIndex).trim();
          const key = rawSpec.substring(colonIndex + 1).trim();
          el.setAttribute(attr, this.t(key));
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
