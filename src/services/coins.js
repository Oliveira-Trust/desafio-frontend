import { configCoins } from '@/utils/api-instance';
import { convertBrlInNumber } from '@/utils';

export const getBtcToBrlValue = async () => {
    const api = configCoins();
    const { data } = await api.get('last/BTC-BRL');
    let value = convertBrlInNumber(data.btcbrl.ask);
    return value
}