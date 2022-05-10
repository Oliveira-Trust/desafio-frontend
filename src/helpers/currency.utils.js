export function getCryptoValueByCurrencyValue (currencyValue, cryptoValue) {
  return parseFloat((parseFloat(currencyValue) / parseFloat(cryptoValue.replace('.', '').padEnd(6, "0"))).toFixed(8));
}