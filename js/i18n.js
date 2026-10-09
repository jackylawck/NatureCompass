/**
 * js/i18n.js - 見性羅盤 雙語分發核心
 * 職責：
 * 1. 字典集中掛載 (ui, questions, profiles)
 * 2. 雙層降級機制 (當前語系未命中 -> 回退 en 預設語系 -> 回退 raw key)
 * 3. 安全更新葉節點與標籤屬性 (防範物件破壞 DOM，零 CSP 違規)
 * 4. 同步導航按鈕 active / aria 狀態
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
        // localStorage 降級處理 (如無痕模式配額受限)
      }
      browserLang = navigator?.language || 'en';
    }

    const detected = normalizeLocale(saved || browserLang);
    this.currentLocale = detected === 'zh-Hans' ? 'zh-Hant' : detected;
  }

  /**
   * 取得字典項目
   * 具備雙層 fallback 機制：當前語系 -> 英文預設 -> raw path
   * @param {string} path 字典點路徑 (例如 "ui.meta.title" 或 "questions.q1")
   * @returns {string|object}
   */
  t(path) {
    if (!path || typeof path !== 'string') return '';

    // 1. 查當前語系
    const activeDict = dictionaries[this.currentLocale] ?? dictionaries['en'];
    let resolved = path.split('.').reduce((obj, key) => obj?.[key], activeDict);

    // 2. 當前語系查無資料時，回退至 en 預設字典
    if (resolved === undefined || resolved === null) {
      resolved = path.split('.').reduce((obj, key) => obj?.[key], dictionaries['en']);
    }

    // 3. 兩者皆無時返回 path
    return (resolved !== undefined && resolved !== null) ? resolved : path;
  }

  /**
   * 切換語系並重新渲染 DOM 靜態標籤
   * @param {string} locale
   */
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

      // 靜態純文字葉節點替換 (嚴守 ADR-003，僅在取回字串時更新)
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const val = this.t(key);
        if (typeof val === 'string') {
          el.textContent = val;
        }
      });

      // 標籤屬性替換 (支援多屬性分號分隔，如 placeholder:ui.form.name;title:ui.form.tip)
      document.querySelectorAll('[data-i18n-attr]').forEach(el => {
        const rawSpecs = el.getAttribute('data-i18n-attr').split(';');
        rawSpecs.forEach(spec => {
          const colonIndex = spec.indexOf(':');
          if (colonIndex !== -1) {
            const attr = spec.substring(0, colonIndex).trim();
            const key = spec.substring(colonIndex + 1).trim();
            const val = this.t(key);
            if (typeof val === 'string') {
              el.setAttribute(attr, val);
            }
          }
        });
      });

      // 同步語系切換按鈕的選中樣式與無障礙狀態
      const btnZh = document.getElementById('btn-lang-zh');
      const btnEn = document.getElementById('btn-lang-en');
      if (btnZh && btnEn) {
        const isZh = this.currentLocale === 'zh-Hant';
        btnZh.classList.toggle('active', isZh);
        btnZh.setAttribute('aria-pressed', isZh ? 'true' : 'false');
        btnEn.classList.toggle('active', !isZh);
        btnEn.setAttribute('aria-pressed', !isZh ? 'true' : 'false');
      }
    }

    // 發送全局語系變更廣播
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
