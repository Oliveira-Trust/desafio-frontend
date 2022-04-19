import { coinsApi } from "../utils/api";

export const getCoinValue = async () => {
    const { data } = await coinsApi.get('last/BTC-BRL');
    return Number(data.BTCBRL.ask);
}