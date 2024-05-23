export function getCryptoValueByCurrencyValue (currencyValue: string, cryptoValue: string) {
  return parseFloat((parseFloat(currencyValue) / parseFloat(cryptoValue.replace('.', '').padEnd(6, "0"))).toFixed(8));
}
