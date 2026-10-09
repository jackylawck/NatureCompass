/* css/style.css - 見性羅盤 主題與組件樣式 */
:root {
  --primary-color: #0284c7;
  --primary-hover: #0369a1;
  --bg-color: #f8fafc;
  --card-bg: #ffffff;
  --text-main: #0f172a;
  --text-muted: #64748b;
  --border-color: #e2e8f0;
  --most-color: #10b981;
  --least-color: #f43f5e;

  /* 雷達圖變數 */
  --radar-fill: rgba(2, 132, 199, 0.2);
  --radar-stroke: #0284c7;
  --radar-grid: #e2e8f0;
  --radar-axis: #cbd5e1;
  --radar-text: #1e293b;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #0f172a;
    --card-bg: #1e293b;
    --text-main: #f8fafc;
    --text-muted: #94a3b8;
    --border-color: #334155;

    --radar-fill: rgba(56, 189, 248, 0.25);
    --radar-stroke: #38bdf8;
    --radar-grid: #334155;
    --radar-axis: #475569;
    --radar-text: #f1f5f9;
  }
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang TC", "Noto Sans TC", sans-serif;
  background-color: var(--bg-color);
  color: var(--text-main);
  line-height: 1.6;
}

.container {
  max-width: 820px;
  margin: 0 auto;
  padding: 24px 16px;
}

/* 頂部導航 */
.app-header {
  border-bottom: 1px solid var(--border-color);
  background: var(--card-bg);
  padding: 16px 0;
}
.header-inner {
  max-width: 820px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.brand h1 { margin: 0; font-size: 20px; }
.brand .tagline { margin: 4px 0 0; font-size: 13px; color: var(--text-muted); }

.lang-btn {
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-main);
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}
.lang-btn:hover { background: var(--border-color); }

/* 宣告提示 */
.charter-box {
  background: rgba(2, 132, 199, 0.08);
  border-left: 4px solid var(--primary-color);
  padding: 12px 16px;
  border-radius: 4px;
  margin-bottom: 24px;
  font-size: 13px;
}
.charter-box strong { display: block; margin-bottom: 4px; color: var(--primary-color); }

/* 主卡片容器 */
.card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
}

.input-group { margin-bottom: 20px; }
.input-group label { display: block; font-size: 14px; margin-bottom: 6px; }
.input-group input {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 14px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: transparent;
  color: var(--text-main);
}

/* 進度條 */
.card-header { margin-bottom: 20px; }
.step-badge { font-size: 13px; font-weight: 600; color: var(--text-muted); }
.progress-bar-bg {
  height: 6px;
  background: var(--border-color);
  border-radius: 3px;
  margin-top: 8px;
  overflow: hidden;
}
.progress-bar-fill { height: 100%; background: var(--primary-color); transition: width 0.25s ease; }

.question-prompt { font-size: 18px; margin: 0 0 20px; font-weight: 600; }

/* 選項清單 */
.options-container { display: flex; flex-direction: column; gap: 12px; }
.option-row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  transition: all 0.2s;
}
.option-row.selected-most { border-color: var(--most-color); background: rgba(16, 185, 129, 0.05); }
.option-row.selected-least { border-color: var(--least-color); background: rgba(244, 63, 94, 0.05); }

.option-actions { display: flex; gap: 6px; flex-shrink: 0; }
.btn-select {
  border: 1px solid var(--border-color);
  background: transparent;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  color: var(--text-muted);
}
.btn-select.btn-most.active { background: var(--most-color); color: #fff; border-color: var(--most-color); }
.btn-select.btn-least.active { background: var(--least-color); color: #fff; border-color: var(--least-color); }

.option-text { display: flex; gap: 8px; font-size: 15px; }
.option-letter { font-weight: bold; color: var(--text-muted); }

/* 按鈕操作欄 */
.card-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
}
.btn-nav {
  padding: 10px 20px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  background: transparent;
  color: var(--text-main);
  cursor: pointer;
  font-weight: 500;
}
.btn-nav.btn-primary { background: var(--primary-color); color: #fff; border-color: var(--primary-color); }
.btn-nav:disabled { opacity: 0.4; cursor: not-allowed; }

/* 報告樣式 */
.report-header { text-align: center; margin-bottom: 24px; }
.report-header h2 { margin: 0 0 6px; }
.timestamp { font-size: 13px; color: var(--text-muted); margin: 0; }

.summary-card {
  background: rgba(2, 132, 199, 0.06);
  padding: 16px 20px;
  border-radius: 8px;
  margin-bottom: 24px;
}
.primary-summary { margin: 0; font-size: 16px; color: var(--primary-color); }

.report-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: center;
  margin-bottom: 24px;
}
@media (max-width: 640px) {
  .report-grid { grid-template-columns: 1fr; }
}

.rank-list { list-style: none; padding: 0; margin: 0 0 20px; }
.rank-list li {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px dashed var(--border-color);
  font-size: 14px;
}
.tie-tag { font-size: 12px; color: var(--primary-color); }

.weight-bars { display: flex; flex-direction: column; gap: 8px; }
.weight-item { display: flex; align-items: center; gap: 10px; font-size: 13px; }
.weight-dim { width: 16px; font-weight: bold; }
.weight-bar-bg { flex: 1; height: 8px; background: var(--border-color); border-radius: 4px; overflow: hidden; }
.weight-bar-fill { height: 100%; background: var(--primary-color); }
.weight-pct { width: 36px; text-align: right; }

.disclaimer-footer {
  font-size: 12px;
  color: var(--text-muted);
  border-top: 1px solid var(--border-color);
  padding-top: 16px;
  margin-bottom: 24px;
}

.report-actions { display: flex; justify-content: center; gap: 16px; }
.btn-action {
  padding: 10px 24px;
  background: var(--primary-color);
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}
.btn-action.secondary { background: var(--border-color); color: var(--text-main); }

.alert-banner.warning {
  background: #fffbeb;
  border-left: 4px solid #f59e0b;
  color: #b45309;
  padding: 12px 16px;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 13px;
}
