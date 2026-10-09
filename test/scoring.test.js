test('ScoringEngine: 注意力檢查精確驗證單向 Most（least 為 null 或任意值時放行）', () => {
  // 建立嚴格保證 netSum === 0 的常規題作答集
  // 作法：提取每題各選項所屬維度，成對抵消或對稱選擇保證數學守恆
  const createBalancedResponses = (attentionOverride) => {
    return questionsStructure.map(q => {
      if (q.type === 'attention_check') {
        return { id: q.id, ...attentionOverride };
      }
      // 常規題：選取不同維度選項（例如 A 與 B）
      return { id: q.id, most: q.options[0].key, least: q.options[1].key };
    });
  };

  // 1. 取得題目配置中的真實 expected 答案，避免寫死字元
  const attentionQ = questionsStructure.find(q => q.type === 'attention_check');
  assert.ok(attentionQ, '題庫必須包含注意力檢查題');
  const targetMost = attentionQ.expected.most;
  const wrongMost = attentionQ.options.find(o => o.key !== targetMost).key;

  // 情況 1：選對 Most，Least 為 null -> 必須判定 attentionPassed: true
  const validResponsesNullLeast = createBalancedResponses({ most: targetMost, least: null });
  // 確保淨偏好守恆修正：直接使用合規作答集合驗證
  // 為了確保 netSum 恆等於 0，使用成對平衡的維度映射：
  const balancedMock = questionsStructure.map((q, idx) => {
    if (q.type === 'attention_check') {
      return { id: q.id, most: targetMost, least: null };
    }
    // 前 12 題選 A(+)/B(-)，後 12 題反向選 B(+)/A(-)，正負嚴格抵消確保 netSum === 0
    return idx % 2 === 0
      ? { id: q.id, most: q.options[0].key, least: q.options[1].key }
      : { id: q.id, most: q.options[1].key, least: q.options[0].key };
  });

  const validResult = ScoringEngine.calculate(balancedMock);
  assert.strictEqual(validResult.isValid, true, `作答應合法，原因: ${validResult.invalidReason}`);
  assert.strictEqual(validResult.attentionPassed, true, '選中 expected.most 且 least 為 null 時注意力檢查應通過');

  // 情況 2：選對 Most，Least 填了任意選項 -> 依單向契約仍應通過
  const validMockWithLeast = balancedMock.map(r => 
    r.id === attentionQ.id ? { id: r.id, most: targetMost, least: attentionQ.options[0].key } : r
  );
  const validResultWithLeast = ScoringEngine.calculate(validMockWithLeast);
  assert.strictEqual(validResultWithLeast.isValid, true);
  assert.strictEqual(validResultWithLeast.attentionPassed, true, '單向契約下，Least 填寫任意值不應影響通過');

  // 情況 3：選錯 Most -> 判定 attentionPassed: false
  const invalidMock = balancedMock.map(r => 
    r.id === attentionQ.id ? { id: r.id, most: wrongMost, least: null } : r
  );
  const invalidResult = ScoringEngine.calculate(invalidMock);
  assert.strictEqual(invalidResult.isValid, true, `作答格式應合法，原因: ${invalidResult.invalidReason}`);
  assert.strictEqual(invalidResult.attentionPassed, false, '未選中 expected.most 時注意力檢查應為未通過');
});
