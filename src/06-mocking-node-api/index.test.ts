import path from 'path';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';
import fs from 'fs';

const DELAY_MS = 1000;

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, DELAY_MS);
    expect(setTimeout).toHaveBeenCalledWith(callback, DELAY_MS);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, DELAY_MS);

    expect(callback).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(DELAY_MS);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setInterval');
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, DELAY_MS);
    expect(setInterval).toHaveBeenCalledWith(callback, DELAY_MS);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, DELAY_MS);

    expect(callback).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(DELAY_MS);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(DELAY_MS);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  const PATH_TO_FILE = 'testFile.txt';

  test('should call join with pathToFile', async () => {
    const pathJoin = jest.spyOn(path, 'join');
    await readFileAsynchronously(PATH_TO_FILE);
    expect(pathJoin).toHaveBeenCalledWith(__dirname, PATH_TO_FILE);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockImplementation(() => false);
    await expect(readFileAsynchronously(PATH_TO_FILE)).resolves.toBe(null);
  });

  test('should return file content if file exists', async () => {
    const FILE_DATA = 'FILE_DATA';
    jest.spyOn(fs, 'existsSync').mockImplementation(() => true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(FILE_DATA);
    await expect(readFileAsynchronously(PATH_TO_FILE)).resolves.toBe(FILE_DATA);
  });
});
