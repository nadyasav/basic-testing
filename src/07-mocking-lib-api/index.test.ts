import axios, { Axios } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => {
  const originalModule = jest.requireActual<typeof import('lodash')>('lodash');
  return {
    ...originalModule,
    throttle: jest.fn((fn: unknown) => fn),
  };
});

describe('throttledGetDataFromApi', () => {
  const RELATIVE_PATH = 'posts';
  const RES_DATA = { id: '1' };
  const baseURL = 'https://jsonplaceholder.typicode.com';

  beforeEach(() => {
    jest
      .spyOn(Axios.prototype, 'get')
      .mockImplementation(async () => ({ data: RES_DATA }));
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const axiosCreate = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(RELATIVE_PATH);
    expect(axiosCreate).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const axiosGet = jest.spyOn(Axios.prototype, 'get');
    await throttledGetDataFromApi(RELATIVE_PATH);
    expect(axiosGet).toHaveBeenCalledWith(RELATIVE_PATH);
  });

  test('should return response data', async () => {
    await expect(throttledGetDataFromApi(RELATIVE_PATH)).resolves.toEqual(
      RES_DATA,
    );
  });
});
