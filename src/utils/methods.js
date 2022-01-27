export const convertCurrency = (value, moedaDestino) => {
  return new Intl.NumberFormat("pt-br", {
    style: "currency",
    maximumSignificantDigits: 8,
    currency: moedaDestino,
  }).format(value);
};

export const QUANTITY_BTC = 0.001;

export const calculateAmountBRL = (amountPriceBRL, priceBTC) => {
  return Number(((amountPriceBRL * QUANTITY_BTC) / priceBTC).toFixed(8));
}

export const deconvertCurrency = value => {
  if (typeof value !== 'string') return value;
  return reverseFormat('pt-BR', 'BRL', value) || 0;

};

export const reverseFormat = (lang, currency, money) => {
  const separatorDecimal = new Intl.NumberFormat(lang, {
    style: "decimal"
  })
    .format(11.11)
    .replace(/\d/g, "");

  const separatorThousands = new Intl.NumberFormat(lang, {
    style: "decimal"
  })
    .format(1111)
    .replace(/\d/g, "");

  const symbolOnLeft = new Intl.NumberFormat(lang, {
    style: "currency",
    currency
  })
    .format(1)
    .replace(
      new RegExp(`\\d|[${separatorDecimal}${separatorThousands}]*`, "g"),
      ""
    );

  const stringNumber = money
    .replace(new RegExp(`[${separatorThousands}]`, "g"), "")
    .replace(separatorDecimal, ".")
    .replace(new RegExp(`[${symbolOnLeft}]`, "g"), "");

  return parseFloat(stringNumber);
}
