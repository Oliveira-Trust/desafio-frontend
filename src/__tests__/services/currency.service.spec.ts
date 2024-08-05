import { vi, describe, it, expect } from 'vitest';
import type { Mock } from 'vitest';
import { makeRequest } from "@/utils/request.utils";
import { pullCryptoCurrencyPriceRequest } from "@/services/currency.service";

vi.mock('@/utils/request.utils', () => ({
  makeRequest: vi.fn()
}));

describe('pullCryptoCurrencyPriceRequest', () => {
  const currencyApiEndpoint = import.meta.env.VITE_CRYPTO_PRICE_ENDPOINT;
  const mockedRequest = makeRequest as Mock;

  it('should return the cryptocurrency price', async () => {
    const mockResponse = {
      json: vi.fn().mockResolvedValue({ price: 100 })
    };
    mockedRequest.mockResolvedValue(mockResponse);

    const cryptoCurrency = 'bitcoin';
    const currency = 'usd';
    const result = await pullCryptoCurrencyPriceRequest(cryptoCurrency, currency);

    expect(makeRequest).toHaveBeenCalledWith(`${currencyApiEndpoint}${cryptoCurrency}-${currency}`);
    expect(result).toEqual({ price: 100 });
  });

  it('should throw an error when the request fails', async () => {
    mockedRequest.mockRejectedValue(new Error('Request failed'));

    const cryptoCurrency = 'bitcoin';
    const currency = 'usd';

    await expect(pullCryptoCurrencyPriceRequest(cryptoCurrency, currency)).rejects.toThrow('Request failed');
  });
});