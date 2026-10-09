/**
 * js/questions.js - 迫選題目結構骨架 (含注意力檢查)
 * License: CC BY-NC-SA 4.0 (Non-Commercial, ShareAlike)
 * ADR-005: 僅存結構與維度映射，無文本內容。
 */

export const questionsStructure = [
  { id: 1, type: 'ipsative', options: [{ key: 'A', dim: 'D' }, { key: 'B', dim: 'I' }, { key: 'C', dim: 'S' }, { key: 'D', dim: 'C' }] },
  { id: 2, type: 'ipsative', options: [{ key: 'A', dim: 'I' }, { key: 'B', dim: 'S' }, { key: 'C', dim: 'C' }, { key: 'D', dim: 'D' }] },
  { id: 3, type: 'ipsative', options: [{ key: 'A', dim: 'S' }, { key: 'B', dim: 'C' }, { key: 'C', dim: 'D' }, { key: 'D', dim: 'I' }] },
  { id: 4, type: 'ipsative', options: [{ key: 'A', dim: 'C' }, { key: 'B', dim: 'D' }, { key: 'C', dim: 'I' }, { key: 'D', dim: 'S' }] },
  { id: 5, type: 'ipsative', options: [{ key: 'A', dim: 'D' }, { key: 'B', dim: 'S' }, { key: 'C', dim: 'I' }, { key: 'D', dim: 'C' }] },
  { id: 6, type: 'ipsative', options: [{ key: 'A', dim: 'I' }, { key: 'B', dim: 'C' }, { key: 'C', dim: 'S' }, { key: 'D', dim: 'D' }] },
  { id: 7, type: 'ipsative', options: [{ key: 'A', dim: 'S' }, { key: 'B', dim: 'D' }, { key: 'C', dim: 'C' }, { key: 'D', dim: 'I' }] },
  { id: 8, type: 'ipsative', options: [{ key: 'A', dim: 'C' }, { key: 'B', dim: 'I' }, { key: 'C', dim: 'D' }, { key: 'D', dim: 'S' }] },
  { id: 9, type: 'ipsative', options: [{ key: 'A', dim: 'D' }, { key: 'B', dim: 'C' }, { key: 'C', dim: 'S' }, { key: 'D', dim: 'I' }] },
  { id: 10, type: 'ipsative', options: [{ key: 'A', dim: 'I' }, { key: 'B', dim: 'D' }, { key: 'C', dim: 'C' }, { key: 'D', dim: 'S' }] },
  { id: 11, type: 'ipsative', options: [{ key: 'A', dim: 'S' }, { key: 'B', dim: 'I' }, { key: 'C', dim: 'D' }, { key: 'D', dim: 'C' }] },
  { id: 12, type: 'ipsative', options: [{ key: 'A', dim: 'C' }, { key: 'B', dim: 'S' }, { key: 'C', dim: 'I' }, { key: 'D', dim: 'D' }] },
  { id: 13, type: 'ipsative', options: [{ key: 'A', dim: 'D' }, { key: 'B', dim: 'I' }, { key: 'C', dim: 'C' }, { key: 'D', dim: 'S' }] },
  { id: 14, type: 'ipsative', options: [{ key: 'A', dim: 'I' }, { key: 'B', dim: 'S' }, { key: 'C', dim: 'D' }, { key: 'D', dim: 'C' }] },
  { id: 15, type: 'ipsative', options: [{ key: 'A', dim: 'S' }, { key: 'B', dim: 'I' }, { key: 'C', dim: 'C' }, { key: 'D', dim: 'D' }] },
  { id: 16, type: 'ipsative', options: [{ key: 'A', dim: 'C' }, { key: 'B', dim: 'D' }, { key: 'C', dim: 'S' }, { key: 'D', dim: 'I' }] },
  { id: 17, type: 'ipsative', options: [{ key: 'A', dim: 'D' }, { key: 'B', dim: 'S' }, { key: 'C', dim: 'C' }, { key: 'D', dim: 'I' }] },
  { id: 18, type: 'ipsative', options: [{ key: 'A', dim: 'I' }, { key: 'B', dim: 'C' }, { key: 'C', dim: 'D' }, { key: 'D', dim: 'S' }] },
  { id: 19, type: 'ipsative', options: [{ key: 'A', dim: 'S' }, { key: 'B', dim: 'D' }, { key: 'C', dim: 'I' }, { key: 'D', dim: 'C' }] },
  { id: 20, type: 'ipsative', options: [{ key: 'A', dim: 'C' }, { key: 'B', dim: 'I' }, { key: 'C', dim: 'S' }, { key: 'D', dim: 'D' }] },
  { id: 21, type: 'ipsative', options: [{ key: 'A', dim: 'D' }, { key: 'B', dim: 'C' }, { key: 'C', dim: 'I' }, { key: 'D', dim: 'S' }] },
  { id: 22, type: 'ipsative', options: [{ key: 'A', dim: 'I' }, { key: 'B', dim: 'D' }, { key: 'C', dim: 'S' }, { key: 'D', dim: 'C' }] },
  { id: 23, type: 'ipsative', options: [{ key: 'A', dim: 'S' }, { key: 'B', dim: 'I' }, { key: 'C', dim: 'C' }, { key: 'D', dim: 'D' }] },
  { id: 24, type: 'ipsative', options: [{ key: 'A', dim: 'C' }, { key: 'B', dim: 'S' }, { key: 'C', dim: 'D' }, { key: 'D', dim: 'I' }] },
  { id: 25, type: 'attention_check', expected: { most: 'C', least: null }, options: [{ key: 'A', dim: 'NONE' }, { key: 'B', dim: 'NONE' }, { key: 'C', dim: 'NONE' }, { key: 'D', dim: 'NONE' }] }
];
