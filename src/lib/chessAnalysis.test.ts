import { describe, expect, it } from 'vitest';
import { classifyMove } from './chessAnalysis';

describe('classifyMove', () => {
  it('classifies blunder thresholds', () => {
    expect(classifyMove(200, -200)).toBe('Blunder ??');
    expect(classifyMove(200, 20)).toBe('Mistake ?');
    expect(classifyMove(100, 40)).toBe('Miss');
    expect(classifyMove(60, 35)).toBe('Inaccuracy ?!');
    expect(classifyMove(50, 45)).toBe('Good !');
    expect(classifyMove(0, 5)).toBe('Best !!');
  });
});
