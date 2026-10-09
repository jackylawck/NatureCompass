# 見性羅盤：架構治理、法規適用性除外評估憲章
# Nature Compass: Architectural Governance & Regulatory Out-of-Scope Assessment Charter

---

## 繁體中文 (Traditional Chinese)

### 1. 系統本質與架構定義 (Architectural Definition)
- **架構模式**：本工具為「純前端、客戶端自包含、零伺服器（Zero-Server Architecture）」靜態網頁應用。
- **演算法性質**：核心計分邏輯為確定性算術矩陣（Deterministic Matrix Algebra）與最大餘數法，**不包含任何機器學習（Machine Learning）、深度神經網絡（DNN）或生成式人工智能（Generative AI）技術**。
- **數據主權**：所有作答數據僅在用戶瀏覽器之臨時記憶體（RAM）內處理，重整即逝，無遠端伺服器存儲、無日誌追蹤、無數據回傳（Zero Data Retention）。

### 2. 全球 AI 治理與法規適用性評估 (Regulatory Applicability Assessment)
針對中外主要監管法規，本專案出具以下法定適用性評估：

- **歐盟人工智能法案 (EU AI Act, Regulation (EU) 2024/1689)**：
  - **評估判定：不適用 (Out of Scope)**。
  - **法律依據**：本工具採用固定算術規則，缺乏 EU AI Act 第 3(1) 條所定義之「自主性系統與模型推論能力」。此外，系統明文禁絕用於高利害（High-Stakes）場景（如招聘甄選、解僱裁定、信貸評級），不構成 Annex III 所列之高風險 AI 系統。
- **國家互聯網信息辦公室（網信辦）法規**：
  - **評估判定：不適用 (Out of Scope)**。
  - **法律依據**：本專案未採用任何深度合成、演算法推薦或生成式技術，不屬於《生成式人工智能服務管理暫行辦法》或《互聯網信息服務算法推薦管理規定》之規制對象。
- **歐盟通用數據保障條例 (GDPR) 與香港《個人資料（私隱）條例》(Cap. 486)**：
  - **評估判定：架構級合規 (Compliant by Design)**。
  - **法律依據**：專案開發者及託管平台不收集、不訪問、不處理、不保存任何受測者姓名或作答紀錄。開發者不構成 GDPR 第 4(7) 條之「資料控制者（Data Controller）」或 Cap. 486 所稱之「資料使用者（Data User）」，亦無跨國數據傳輸（Cross-Border Transfer）實質。

### 3. ISO 標準對齊聲明 (ISO Standards Alignment)
- **ISO/IEC 42001 (人工智能管理系統 - AIMS)**：雖然系統本身非 AI，但治理流程遵循透明度、可解釋性與確定性要求，輸出邏輯具備 100% 審計可重現性。
- **ISO/IEC 27001 (資訊安全) & ISO/IEC 27701 (隱私資訊管理)**：落實零信任（Zero-Trust）原則，採用靜態託管硬化策略（CSP, nosniff, frame-ancestors 'none'），實現源頭數據最小化（Data Minimisation）。

---

## English

### 1. Architectural Definition
- **System Nature**: Nature Compass is a client-side, self-contained, zero-server static web utility.
- **Algorithm Class**: The scoring mechanism consists purely of deterministic matrix algebra and the Largest Remainder Method. It **does NOT employ machine learning, deep neural networks, or generative AI models**.
- **Data Sovereignty**: All inputs and responses are executed exclusively within the user's local browser volatile memory (RAM). There is zero telemetry, zero server-side retention, and zero external network transmission.

### 2. Global AI & Regulatory Applicability Assessment
In accordance with international standards, the following jurisdictional boundaries apply:

- **EU Artificial Intelligence Act (Regulation (EU) 2024/1689)**:
  - **Determination: Out of Scope**.
  - **Legal Basis**: The codebase operates on static arithmetic heuristics and lacks the adaptive autonomy defined under Article 3(1). Furthermore, explicit charters prohibit deployment in Annex III high-risk employment or creditworthiness decisions.
- **China CAC (Cyberspace Administration of China) Regulations**:
  - **Determination: Out of Scope**.
  - **Legal Basis**: The utility employs neither generative AI algorithms nor recommendation models, falling outside the regulatory thresholds of the *Interim Measures for the Management of Generative AI Services*.
- **EU GDPR & Hong Kong Personal Data (Privacy) Ordinance (Cap. 486)**:
  - **Determination: Compliant by Design (Exempt from Data Processing Obligations)**.
  - **Legal Basis**: Authors and repository hosts retain zero access to telemetry or identifiable data. Authors do not act as "Data Controllers" (GDPR Art. 4(7)) or "Data Users" (Cap. 486). No cross-border data transfer occurs.

### 3. Alignment with ISO Standards
- **ISO/IEC 42001 (Artificial Intelligence Management System)**: Demonstrates end-to-end algorithmic transparency and deterministic explainability with 100% mathematical reproducibility.
- **ISO/IEC 27001 & ISO/IEC 27701**: Enforces extreme data minimization and perimeter hardening via strict HTTP security headers (CSP, COOP, CORP) and client-side isolation.
