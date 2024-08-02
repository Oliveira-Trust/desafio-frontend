export function getCryptoValueByCurrencyValue (currencyValue: string, cryptoValue: string) {
  const currency = parseFloat(currencyValue);
  const crypto = parseFloat(cryptoValue.replace('.', '').padEnd(6, "0"));

  if (isNaN(currency) || isNaN(crypto) || crypto === 0) {
    throw new Error('Invalid value');
  }

  return parseFloat((currency / crypto).toFixed(8));
}