import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  const balance = 100;
  const amount = 10;

  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(balance);
    expect(bankAccount.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(balance);
    const withdrawalAmount = balance + 0.1;
    expect(() => bankAccount.withdraw(withdrawalAmount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount = getBankAccount(balance);
    const recipient = getBankAccount(50);
    const transferAmount = balance + 0.1;
    expect(() => bankAccount.transfer(transferAmount, recipient)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(balance);
    expect(() => bankAccount.transfer(amount, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(balance);
    bankAccount.deposit(amount);
    expect(bankAccount.getBalance()).toBe(balance + amount);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(balance);
    bankAccount.withdraw(amount);
    expect(bankAccount.getBalance()).toBe(balance - amount);
  });

  test('should transfer money', () => {
    const bankAccount = getBankAccount(balance);
    const recipientBalance = 150;
    const recipient = getBankAccount(recipientBalance);

    bankAccount.transfer(amount, recipient);
    expect(bankAccount.getBalance()).toBe(balance - amount);
    expect(recipient.getBalance()).toBe(recipientBalance + amount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const value = 200;
    jest.spyOn(lodash, 'random').mockImplementation(() => value);
    const bankAccount = getBankAccount(balance);
    await expect(bankAccount.fetchBalance()).resolves.toBe(value);
  });

  test('should set newBalance if fetchBalance returned number', async () => {
    const newBalance = 180;
    jest
      .spyOn(BankAccount.prototype, 'fetchBalance')
      .mockImplementation(async () => newBalance);

    const bankAccount = getBankAccount(balance);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest
      .spyOn(BankAccount.prototype, 'fetchBalance')
      .mockImplementation(async () => null);

    const bankAccount = getBankAccount(balance);
    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
