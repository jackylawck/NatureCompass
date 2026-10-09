/**
 * locales/zh-Hant/ui.js - 繁體中文 UI 字典
 * License: CC BY-NC-SA 4.0 (Non-Commercial, ShareAlike)
 */

export default {
  meta: {
    title: "見性羅盤",
    tagline: "零伺服器・性格特質與行為偏好探索沙盒"
  },
  charter: {
    title: "非高利害探索邊界宣告",
    notice: "本工具專供個人自我覺察與教練對話探索，嚴禁直接用於招聘篩選、績效裁決或任何高利害人力決策。"
  },
  guide: {
    toggle_btn: "📖 探索指引與操作說明",
    title: "如何使用見性羅盤？",
    rule_title: "1. 作答規則（強迫選擇）",
    rule_desc: "每組情境包含 4 個選項。請憑第一直覺，必須選出 1 個「最符合 [+]」與 1 個「最不符 [-]」。兩者不可重複。",
    mindset_title: "2. 探索心態",
    mindset_desc: "本工具並非能力測驗，選項亦無優劣對錯之分。請以日常真實的職場協作慣性作答，無需猜測「理想答案」。",
    keyboard_title: "3. 鍵盤快捷操作（電腦端推薦）",
    keyboard_desc: "數字鍵 [1 - 4]：選取最符合 [+] ｜ 字母鍵 [Q, W, E, R]：選取最不符 [-] ｜ 左右方向鍵 [← / →]：切換題目。"
  },
  form: {
    name_label: "受測者稱謂（選填）：",
    name_placeholder: "例如：Jarvis Son"
  },
  nav: {
    zh_btn: "繁體中文",
    en_btn: "English"
  },
  assessment: {
    progress: "進度：{current} / {total}",
    btn_most: "[+] 最符合",
    btn_least: "[-] 最不符",
    btn_prev: "上一題",
    btn_next: "下一題",
    btn_submit: "產出探索報告",
    alert_invalid: "作答無效或未完成："
  },
  chart: {
    dims: {
      D: "D (主導 / 挑戰)",
      I: "I (影響 / 共鳴)",
      S: "S (穩健 / 步調)",
      C: "C (遵從 / 謹慎)"
    },
    radar_title: "行為風格相對權衡雷達圖",
    center_label: "基準平衡點 (0)"
  },
  report: {
    ranking_title: "當下偏好排序",
    weights_title: "相對權重分佈",
    raw_net_title: "原始情境淨分 (-24 至 +24)",
    tie_notice: "（同分並列）",
    primary_single: "主要顯著風格：{styles}",
    primary_double: "雙高並列風格：偏好同時側重於 {styles}，兩者並駕齊驅",
    primary_triple: "多維均衡風格：偏好在 {styles} 間呈現高度協同",
    primary_all_tie: "四維完全平衡：在受測情境中展現高度情境適應性，無單一主導風格",
    disclaimer: "注意：本結果僅反映您在 24 組情境中的相對取捨偏好，非絕對能力評級。相對權重為經 +24 基線平移後之歸一化比例，非絕對動機佔比。本系統無常模，嚴禁進行跨人橫向對比。",
    btn_print: "列印 / 匯出 PDF",
    btn_restart: "重新探索"
  }
};
