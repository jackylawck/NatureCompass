test('ScoringEngine: 注意力檢查精確驗證單向 Most（least 為 null 時放行）', () => {
  // 情況 1：選對 Most ('C')，Least 任意或為 null，應該通過
  const validResponses = questionsStructure.map(q => {
    if (q.type === 'attention_check') {
      return { id: q.id, most: 'C', least: null };
    }
    return { id: q.id, most: 'A', least: 'B' };
  });

  const validResult = ScoringEngine.calculate(validResponses);
  assert.strictEqual(validResult.isValid, true);
  assert.strictEqual(validResult.attentionPassed, true, '選中 expected.most 時注意力檢查應為通過');

  // 情況 2：選錯 Most ('A')，應該判定為未通過
  const invalidResponses = questionsStructure.map(q => {
    if (q.type === 'attention_check') {
      return { id: q.id, most: 'A', least: null };
    }
    return { id: q.id, most: 'A', least: 'B' };
  });

  const invalidResult = ScoringEngine.calculate(invalidResponses);
  assert.strictEqual(invalidResult.isValid, true);
  assert.strictEqual(invalidResult.attentionPassed, false, '未選中 expected.most 時注意力檢查應為未通過');
});
