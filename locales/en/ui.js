/**
 * locales/en/ui.js - English UI Dictionary
 * License: CC BY-NC-SA 4.0 (Non-Commercial, ShareAlike)
 */

export default {
  meta: {
    title: "Nature Compass",
    tagline: "A Zero-Server Behavioral Reflection & Self-Discovery Sandbox"
  },
  charter: {
    title: "Non-High-Stakes Scope Charter",
    notice: "This tool is strictly designed for personal self-reflection and coaching dialogue. It must not be used for hiring gatekeeping, promotions, or high-stakes employment decisions."
  },
  guide: {
    toggle_btn: "📖 Instructions & Shortcuts Guide",
    title: "How to Navigate Nature Compass?",
    rule_title: "1. Response Rule (Forced-Choice)",
    rule_desc: "Each scenario features 4 options. Rely on your immediate intuition to select exactly ONE 'Most [+]' and ONE 'Least [-]'. The same option cannot be both.",
    mindset_title: "2. Reflection Mindset",
    mindset_desc: "This is not an assessment of competence, and there are no right or wrong answers. Respond based on your authentic workplace tendencies without guessing ideal profiles.",
    keyboard_title: "3. Keyboard Shortcuts (Recommended)",
    keyboard_desc: "Number keys [1 - 4]: Select Most [+] | Letter keys [Q, W, E, R]: Select Least [-] | Arrow keys [← / →]: Previous / Next question."
  },
  form: {
    name_label: "Assessee Name (Optional):",
    name_placeholder: "e.g., Jarvis Son"
  },
  nav: {
    zh_btn: "繁體中文",
    en_btn: "English"
  },
  assessment: {
    progress: "Progress: {current} / {total}",
    btn_most: "[+] Most",
    btn_least: "[-] Least",
    btn_prev: "Previous",
    btn_next: "Next",
    btn_submit: "Generate Report",
    alert_invalid: "Invalid or incomplete response: "
  },
  chart: {
    dims: {
      D: "D (Dominance / Drive)",
      I: "I (Influence / Inspiration)",
      S: "S (Steadiness / Pace)",
      C: "C (Compliance / Precision)"
    },
    radar_title: "Behavioral Trade-off Radar Chart",
    center_label: "Equilibrium Baseline (0)"
  },
  report: {
    ranking_title: "Preference Ranking",
    weights_title: "Relative Weight Distribution",
    raw_net_title: "Raw Net Preference (-24 to +24)",
    tie_notice: "(Tied Rank)",
    primary_single: "Primary Style: {styles}",
    primary_double: "Double-High Blend: Tendencies equally emphasize {styles} in tandem",
    primary_triple: "Multi-dimensional Blend: Balanced synergy across {styles}",
    primary_all_tie: "Complete Equilibrium: Highly adaptable across all contexts with no single dominant style",
    disclaimer: "Note: Results reflect individual contextual trade-offs within 24 forced choices, not absolute competence. Relative weights represent normalized ratios following a +24 baseline shift, not absolute motivation proportions. No norms applied; cross-individual comparisons are strictly invalid.",
    btn_print: "Print / Export PDF",
    btn_restart: "Restart Exploration"
  }
};
