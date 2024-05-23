import { makeRequest } from "@/utils/request.utils";

export async function pullCryptoCurrencyPriceRequest(cryptoCurrency: string, currency: string): Promise<any> {
  const response = await makeRequest(
    `${import.meta.env.VITE_CRYPTO_PRICE_ENDPOINT}${cryptoCurrency}-${currency}`
  );
  return await response.json();
}
