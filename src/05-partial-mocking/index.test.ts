import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const consoleLog = jest.spyOn(console, 'log');
    mockOne();
    mockTwo();
    mockThree();
    expect(consoleLog).toHaveBeenCalledTimes(0);
  });

  test('unmockedFunction should log into console', () => {
    const consoleLog = jest.spyOn(console, 'log');
    const message = 'I am not mocked';
    unmockedFunction();
    expect(consoleLog).toHaveBeenCalledWith(message);
  });
});
