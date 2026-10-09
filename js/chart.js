/**
 * js/chart.js - 純 SVG 向量雷達圖繪製模組
 * ADR-006:
 * 1. 中心為 0（基準中性），外圈為 +24（正向偏好顯影，負值安全收縮至中心）
 * 2. 顏色與樣式交由 CSS Class / CSS 變數控制，支援列印與深色模式
 */

import { i18n } from './i18n.js';

export class CompassChart {
  /**
   * 生成純 SVG 字串
   * @param {{ D: number, I: number, S: number, C: number }} rawNet
   * @returns {string} SVG HTML 片段
   */
  static renderRadar(rawNet) {
    if (!rawNet || typeof rawNet !== 'object') {
      return '<svg class="compass-svg" viewBox="0 0 360 360"></svg>';
    }

    const size = 360;
    const center = 180;
    const radius = 110;

    // 頂部 D (-90°), 右側 I (0°), 底部 S (90°), 左側 C (180°)
    const dims = [
      { key: 'D', angle: -Math.PI / 2 },
      { key: 'I', angle: 0 },
      { key: 'S', angle: Math.PI / 2 },
      { key: 'C', angle: Math.PI }
    ];

    // 刻度圈：6, 12, 18, 24（中心點為 0，外圈為 +24 最大正向取捨）
    const rings = [6, 12, 18, 24].map(val => {
      const r = (val / 24) * radius;
      return `<circle cx="${center}" cy="${center}" r="${r.toFixed(1)}" 
              class="radar-grid-ring" />`;
    }).join('');

    // 計算四個數據點坐標 (負值代表未被青睞，收斂於中心點 0，正值按幅度外顯)
    const points = dims.map(d => {
      const positiveVal = Math.max(0, rawNet[d.key] ?? 0);
      const r = (positiveVal / 24) * radius;
      const x = center + r * Math.cos(d.angle);
      const y = center + r * Math.sin(d.angle);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');

    // 標籤坐標與文字
    const labels = dims.map(d => {
      const labelRadius = radius + 28;
      const x = center + labelRadius * Math.cos(d.angle);
      const y = center + labelRadius * Math.sin(d.angle);
      const labelText = i18n.t(`ui.chart.dims.${d.key}`);
      const netVal = rawNet[d.key] ?? 0;
      const formattedVal = netVal > 0 ? `+${netVal}` : `${netVal}`;

      return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" 
              class="radar-label"
              text-anchor="middle" 
              dominant-baseline="central">${labelText}: ${formattedVal}</text>`;
    }).join('');

    const titleText = i18n.t('ui.chart.radar_title');

    return `
      <svg viewBox="0 0 ${size} ${size}" class="compass-svg print-friendly" role="img" aria-label="${titleText}">
        <title>${titleText}</title>
        <g class="radar-grid-layer">
          <!-- 中心原點 (0) -->
          <circle cx="${center}" cy="${center}" r="2" class="radar-center-point" />
          ${rings}
          <!-- 軸線 -->
          <line x1="${center - radius}" y1="${center}" x2="${center + radius}" y2="${center}" class="radar-axis-line" />
          <line x1="${center}" y1="${center - radius}" x2="${center}" y2="${center + radius}" class="radar-axis-line" />
        </g>
        <!-- 偏好幾何多邊形 -->
        <polygon points="${points}" class="radar-polygon" />
        <!-- 數據頂點錨點 -->
        ${dims.map(d => {
          const positiveVal = Math.max(0, rawNet[d.key] ?? 0);
          const r = (positiveVal / 24) * radius;
          const x = center + r * Math.cos(d.angle);
          const y = center + r * Math.sin(d.angle);
          return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.5" class="radar-vertex" />`;
        }).join('')}
        <g class="radar-labels-layer">
          ${labels}
        </g>
      </svg>
    `;
  }
}
