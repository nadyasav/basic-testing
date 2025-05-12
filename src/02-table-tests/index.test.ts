import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: '2', action: Action.Add, expected: null },
  { a: 3, b: 2, action: '%', expected: null },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 3, b: -2, action: Action.Divide, expected: -1.5 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
];

describe.each(testCases)(
  'simpleCalculator. Test case index: $#',
  ({ expected, ...args }) => {
    test(`Should return ${expected} for ${args.a} ${args.action} ${args.b})`, () => {
      expect(simpleCalculator({ ...args })).toBe(expected);
    });
  },
);
