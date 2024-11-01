import { generateLinkedList } from './index';

const LINKED_LIST = {
  next: {
    next: {
      next: {
        next: {
          next: null,
          value: null,
        },
        value: 5,
      },
      value: 7,
    },
    value: 3,
  },
  value: 2,
};

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList([2, 3, 7, 5])).toStrictEqual(LINKED_LIST);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList([6, 4, 8, 12])).toMatchSnapshot();
  });
});
