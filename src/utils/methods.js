export const convertCurrency = (value, moedaDestino) => {
  return new Intl.NumberFormat("pt-br", {
    style: "currency",
    maximumSignificantDigits: 8,
    currency: moedaDestino,
  }).format(Number(value));
};

export const QUANTITY_BTC = 0.001;

export const calculateAmountBRL = (amountPriceBRL, priceBTC) => {
  return (amountPriceBRL * QUANTITY_BTC) / priceBTC;
}

export const deconvertCurrency = value => {
  if (typeof value !== 'string') return value;
  return Number(value.replace(/[^\d,]+/g, "").replace(",", "."));
};
