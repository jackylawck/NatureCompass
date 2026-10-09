/**
 * js/chart.js - 純 SVG 向量雷達圖繪製模組
 * ADR-006:
 * 1. 中心為 0（基準中性），外圈為 +24（正向偏好顯影，負值安全收縮至中心）
 * 2. 畫布預留充足邊距，杜絕左右長文本標籤被邊界裁切 (Text Clipping)
 * 3. 純 CSS Class 控制樣式，零內聯 style，完美契合嚴格 CSP 與列印模式
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
      return '<svg class="compass-svg" viewBox="0 0 420 420"></svg>';
    }

    // 擴大畫布至 420x420，給雙語長標籤預留安全邊界
    const size = 420;
    const center = 210;
    const radius = 110;

    // 頂部 D (-90°), 右側 I (0°), 底部 S (90°), 左側 C (180°)
    const dims = [
      { key: 'D', angle: -Math.PI / 2, anchor: 'middle', dy: -12 },
      { key: 'I', angle: 0, anchor: 'start', dy: 4 },
      { key: 'S', angle: Math.PI / 2, anchor: 'middle', dy: 20 },
      { key: 'C', angle: Math.PI, anchor: 'end', dy: 4 }
    ];

    // 刻度圈：6, 12, 18, 24（中心點為 0，外圈為 +24）
    const rings = [6, 12, 18, 24].map(val => {
      const r = (val / 24) * radius;
      return `<circle cx="${center}" cy="${center}" r="${r.toFixed(1)}" class="radar-grid-ring" />`;
    }).join('');

    // 計算四個數據點坐標 (負值收斂至中心 0，正值按幅度外顯)
    const points = dims.map(d => {
      const positiveVal = Math.max(0, rawNet[d.key] ?? 0);
      const r = (positiveVal / 24) * radius;
      const x = center + r * Math.cos(d.angle);
      const y = center + r * Math.sin(d.angle);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');

    // 標籤位置計算（邊距安全距離：左右 18px，上下 16px）
    const labels = dims.map(d => {
      const labelOffset = d.key === 'D' || d.key === 'S' ? 18 : 16;
      const x = center + (radius + labelOffset) * Math.cos(d.angle);
      const y = center + (radius + labelOffset) * Math.sin(d.angle) + d.dy;
      const labelText = i18n.t(`ui.chart.dims.${d.key}`);
      const netVal = rawNet[d.key] ?? 0;
      const formattedVal = netVal > 0 ? `+${netVal}` : `${netVal}`;

      return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" 
                    class="radar-label"
                    text-anchor="${d.anchor}" 
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
        <polygon points="${points}" class="radar-polygon" stroke-linejoin="round" />
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
