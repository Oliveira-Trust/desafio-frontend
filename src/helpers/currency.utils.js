export function getCurrencyValueByCryptoValue (cryptoAmount, currentCryptoValue) {
  return parseFloat((parseFloat((cryptoAmount * currentCryptoValue).toFixed(5).toString().replace('.', '')) / 100).toFixed(2));
}

export function getCryptoValueByCurrencyValue (currencyValue, cryptoValue) {
  return parseFloat((parseFloat(currencyValue) / parseFloat(cryptoValue.replace('.', '').padEnd(6, "0"))).toFixed(8));
}