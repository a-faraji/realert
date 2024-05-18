import { describe, expect, test } from '@jest/globals';

describe('General Tests', () => {
  test('Typescript tests work.', () => {
    expect(1 + 2).toBe(3);
    const a = 'Sentence';
    expect(`This is a ${a}`).toBe('This is a Sentence');
  });
});
