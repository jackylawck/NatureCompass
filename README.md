# 🧭 見性羅盤 | Nature Compass

[English](#english) | [繁體中文](#繁體中文)

---

## 繁體中文

> **識得本性，方知所行。**  
> 一款採用純前端、確定性運算與零伺服器架構的行為風格探索沙盒。專為自我覺察、1-on-1 領導力教練對話及團隊協作反思而設計。

[![License: MIT](https://img.shields.io/badge/Code_License-MIT-blue.svg)](LICENSE)
[![Content License: CC BY-NC-SA 4.0](https://img.shields.io/badge/Content-CC_BY--NC--SA_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
[![Architecture: Zero-Server](https://img.shields.io/badge/Architecture-Zero--Server_PWA-success.svg)](#架構亮點)
[![Security: Strict CSP](https://img.shields.io/badge/Security-Strict_CSP-brightgreen.svg)](#資安與隱私保障)

---

### 🌟 核心特點

- **零伺服器與極致隱私（Zero-Server & Zero Data Retention）**：  
  無後端伺服器、無資料庫、無追蹤 Cookie。所有作答邏輯僅在使用者瀏覽器的暫存記憶體（RAM）內完成運算，視窗關閉即銷毀，數據永不離端。
- **確定性幾何計量模型（Deterministic Ipsative Model）**：  
  拒絕黑盒 AI 與黑盒統計常模。採用 24 組情境迫選題（Forced-Choice）配合常數和檢驗、+24 基線平移與最大餘數法（Largest Remainder Method），精確呈現個人內部相對取捨。
- **純 SVG 幾何雷達圖（Zero-Dependency Pure SVG）**：  
  不依賴任何第三方圖表套件（如 Chart.js 或 D3.js）。由原生代數演算法動態繪製向量多邊形，完全契合嚴格內容安全策略（CSP）。
- **雙語完整對稱與離線支援（i18n & PWA Ready）**：  
  繁體中文（zh-Hant）與英文（en）在題庫、維度特質、複合原型上 100% 鍵位路徑對稱。支援 Service Worker 離線快取，可隨時安裝至桌面或行動裝置。
- **企業級無障礙與鍵盤流操作（A11y & Keyboard Flow）**：  
  支援鍵盤快捷流（數字鍵 `1-4` 選最符合、字母鍵 `Q-R` 選最不符、方向鍵切換題卡），並提供 A4 最佳化列印/PDF 匯出樣式。

---

### 🛡️ 心理計量學與治理邊界宣告

為遵循負責任設計與合規治理標準，本工具明確劃定以下邊界：

1. **非高利害用途（Non-High-Stakes Use）**：  
   本工具嚴禁用於招聘初篩、晉升裁定、績效考核或信貸評估等任何高利害人事決定。
2. **非常模與無橫向可比性（Absence of Normative Benchmarks）**：  
   本模型為自比型（Ipsative），僅反映個人內部的相對偏好優先級。將兩人分數進行橫向大小比對在心理計量學上屬於無效推論。
3. **法規除外宣告（Regulatory Out of Scope）**：  
   本工具採用固定代數運算，**不包含任何機器學習或生成式 AI 模型**，不屬於歐盟《人工智能法案》（EU AI Act）或中國網信辦生成式 AI 規範管轄之 AI 系統。

詳細邊界論證請參閱：
- 心理計量邊界：[`docs/PSYCHOMETRIC-LIMITATIONS.md`](docs/PSYCHOMETRIC-LIMITATIONS.md)
- 架構治理與法規評估：[`docs/GOVERNANCE-CHARTER.md`](docs/GOVERNANCE-CHARTER.md)
- 隱私條款與免責聲明：[`docs/PRIVACY-AND-LEGAL-NOTICE.md`](docs/PRIVACY-AND-LEGAL-NOTICE.md)

---

### 📁 專案目錄結構

```text
NatureCompass/
├── css/
│   ├── style.css              # 主題變數、雙語排版與組件樣式
│   └── print.css              # 單頁 A4 色彩保真列印樣式
├── docs/
│   ├── GOVERNANCE-CHARTER.md          # 治理架構與法規除外評估憲章
│   ├── PRIVACY-AND-LEGAL-NOTICE.md    # 隱私保護與免責法務協議
│   └── PSYCHOMETRIC-LIMITATIONS.md    # 心理計量學限制與自比模型邊界
├── js/
│   ├── app.js                 # 主控制器與狀態機
│   ├── chart.js               # 純 SVG 向量雷達圖繪製模組
│   ├── engine.js              # 迫選計分、平手裁決與歸一化引擎
│   ├── i18n.js                # 雙語字典掛載與動態分發核心
│   ├── locale-utils.js        # BCP-47 語系正規化器
│   └── questions.js           # 題目骨架與維度對稱輪轉矩陣
├── locales/
│   ├── en/                    # 英文題庫、UI 字典與特質原型
│   └── zh-Hant/               # 繁中題庫、UI 字典與特質原型
├── test/
│   ├── i18n-contract.test.js  # DOM 葉節點與字典路徑真實性契約測試
│   ├── i18n-symmetry.test.js  # 雙語字典 Key-Path 100% 對稱測試
│   ├── normalize-locale.test.js # 語系邊界與腳本優先權測試
│   ├── questions-integrity.test.js # 題庫維度平衡與注意力題契約測試
│   └── scoring.test.js        # 數學守恆、常數和與最大餘數法測試
├── _headers                   # 嚴格 CSP 與快取硬化規則 (Cloudflare/Pages)
├── index.html                 # 應用首頁 (無內聯腳本、無外部追蹤)
├── manifest.webmanifest       # PWA 安裝資訊清單
├── sw.js                      # 離線快取 Service Worker
└── package.json               # 雙重授權宣告與原生測試指令

```

---

### 🚀 本地開發與測試

本專案無需任何構建工具（No Webpack, No Vite），原生 ES Module 開箱即用。

#### 1. 執行合約測試套件

需安裝 Node.js (>= 18.13.0)：

```bash
npm install
npm test

```

#### 2. 本地預覽

因使用原生 ES Module，請透過本地靜態伺服器開啟（避免 `file://` 觸發 CORS 阻擋）：

```bash
# 使用 npm 腳本
npm run serve

# 或使用 Python 原生伺服器
python3 -m http.server 8080

```

開啟瀏覽器訪問 `http://localhost:8080` 即可體驗。

---

### 📄 授權條款 (Dual-Licensing)

* **軟體程式碼**：遵循 [MIT License](https://www.google.com/search?q=LICENSE)。
* **題庫內容與特質描述文字**：採用 [知識共享署名-非商業性使用-相同方式共享 4.0 國際版 (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/)。

---

## English

> **Know your nature, navigate your path.**
> A zero-server, deterministic, client-side behavioral reflection sandbox. Engineered for personal self-discovery, 1-on-1 executive coaching, and team developmental dialogue.

---

### 🌟 Core Highlights

* **Zero-Server & Zero Data Retention**:
No backend, no databases, and zero tracking cookies. All response evaluation happens in transient browser RAM and is instantly purged upon tab closure. Your data never leaves your device.
* **Deterministic Ipsative Psychometrics**:
Free of black-box AI and uncalibrated normative benchmarks. Utilizes 24 balanced forced-choice item sets coupled with zero-sum net verification, +24 baseline shifting, and the Largest Remainder Method (Hamilton-Hare) for transparent preference weighting.
* **Pure Vector SVG Radar Chart (Zero-Dependency)**:
Renders responsive radar geometry directly via native trigonometric algorithms without third-party visual engines, ensuring zero CSP violations.
* **100% Symmetric Dual-Language & PWA Ready**:
Strict structural parity across English and Traditional Chinese across all question sets, profiles, and UI keys. Powered by a background Service Worker for full offline reliability and native home-screen installation.
* **Enterprise Accessibility & Keyboard Navigation (A11y)**:
Keyboard shortcuts (`1-4` for Most, `Q-R` for Least, Arrow keys for navigation) and calibrated CSS for single-page A4 PDF report export.

---

### 🛡️ Psychometric & Governance Boundaries

In adherence to responsible behavioral instrument guidelines:

1. **Non-High-Stakes Application**:
Strictly prohibited from use as an automated gatekeeper or evaluation criterion in hiring, promotions, performance appraisals, or credit underwriting.
2. **Absence of Normative Standards**:
This ipsative instrument reflects relative intra-individual preference hierarchies. Cross-individual comparative score ranking is psychometrically invalid.
3. **Regulatory Out of Scope**:
Operates strictly on deterministic algebraic logic without machine learning or neural networks; outside the regulatory scope of the EU Artificial Intelligence Act (EU AI Act) or generative AI mandates.

Detailed documentation:

* Psychometric Boundaries: [`docs/PSYCHOMETRIC-LIMITATIONS.md`](https://www.google.com/search?q=docs/PSYCHOMETRIC-LIMITATIONS.md)
* Governance & Regulatory Assessment: [`docs/GOVERNANCE-CHARTER.md`](https://www.google.com/search?q=docs/GOVERNANCE-CHARTER.md)
* Privacy Policy & Legal Disclaimers: [`docs/PRIVACY-AND-LEGAL-NOTICE.md`](https://www.google.com/search?q=docs/PRIVACY-AND-LEGAL-NOTICE.md)

---

### 🚀 Local Development & Testing

Zero build step required. Uses vanilla ES Modules directly in modern browsers.

#### 1. Run Automated Contract Tests

Requires Node.js (>= 18.13.0):

```bash
npm install
npm test

```

#### 2. Local Preview

Serve via a local static web server to avoid browser `file://` CORS restrictions:

```bash
# Via npm script
npm run serve

# Or via Python 3
python3 -m http.server 8080

```

Navigate to `http://localhost:8080` in your browser.

---

### 📄 Licensing

* **Software Codebase**: Licensed under the [MIT License](https://www.google.com/search?q=LICENSE).
* **Item Banks & Descriptive Content**: Licensed under [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/).

