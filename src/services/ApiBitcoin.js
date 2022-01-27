import { BITCOIN } from '@/services/ApiAxios';
const api = BITCOIN;
import * as methods from "@/utils/methods";

export const currencyConversion = async (currencyOrigin, currencyDestination, amountBTC) => {
  const amountDesconvert = methods.deconvertCurrency(amountBTC);

  const { data } = await api(`json/last/${currencyOrigin}-${currencyDestination}`);

  const constValueBITCOIN = Number(data.BTCBRL.low);

  const amountBRL = (amountDesconvert * constValueBITCOIN) / methods.QUANTITY_BTC;

  return { amountBRL, amountDesconvert, currencyOrigin, currencyDestination, constValueBITCOIN };
};
