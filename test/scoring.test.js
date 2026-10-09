test('ScoringEngine (rankAndWeigh): 防禦不完整或非數值維度輸入', () => {
  // 傳入空物件應拋出 TypeError 而非崩潰於 sortedDims[0].score
  assert.throws(() => {
    ScoringEngine.rankAndWeigh({});
  }, /numeric D, I, S, C fields/);

  // 傳入缺漏維度物件應拋出 TypeError
  assert.throws(() => {
    ScoringEngine.rankAndWeigh({ D: 0, I: 0 });
  }, /numeric D, I, S, C fields/);

  // 傳入含 NaN 的物件應被拒絕
  assert.throws(() => {
    ScoringEngine.rankAndWeigh({ D: 0, I: 0, S: 0, C: NaN });
  }, /numeric D, I, S, C fields/);
});
