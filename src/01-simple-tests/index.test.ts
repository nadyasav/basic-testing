import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  const operands = { a: 7, b: 2 };

  test('should add two numbers', () => {
    const result = simpleCalculator({ ...operands, action: Action.Add });
    expect(result).toBe(9);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ ...operands, action: Action.Subtract });
    expect(result).toBe(5);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ ...operands, action: Action.Multiply });
    expect(result).toBe(14);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ ...operands, action: Action.Divide });
    expect(result).toBe(3.5);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      ...operands,
      action: Action.Exponentiate,
    });
    expect(result).toBe(49);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ ...operands, action: '%' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      ...operands,
      b: '2',
      action: Action.Add,
    });
    expect(result).toBeNull();
  });
});
