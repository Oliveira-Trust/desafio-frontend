import { describe, it, expect } from 'vitest';
import { getCryptoValueByCurrencyValue } from '@/utils/currency.utils';

describe('getCryptoValueByCurrencyValue', () => {
  it('should correctly calculate the crypto value from currency value', () => {
    const currencyValue = '10';
    const cryptoValue = '361745';
    const result = getCryptoValueByCurrencyValue(currencyValue, cryptoValue);
    expect(result).toEqual(0.00002764);
  });

  it('should handle invalid currency value', () => {
    const currencyValue = 'invalid';
    const cryptoValue = '361745';
    expect(() => getCryptoValueByCurrencyValue(currencyValue, cryptoValue)).toThrow();
  });

  it('should handle invalid crypto value', () => {
    const currencyValue = '1000';
    const cryptoValue = 'invalid';
    expect(() => getCryptoValueByCurrencyValue(currencyValue, cryptoValue)).toThrow();
  });

  it('should handle zero crypto value', () => {
    const currencyValue = '1000';
    const cryptoValue = '0.000000';
    expect(() => getCryptoValueByCurrencyValue(currencyValue, cryptoValue)).toThrow();
  });
});