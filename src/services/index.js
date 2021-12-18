import { configAxios } from '@/utils/api-instance';

export const getUsersList = async (queryString = '') => {
    const api = configAxios();
    const { data, headers: { xTotalCount } } = await api.get('users/' + queryString);
    // total of registers
    let total = data.length
    // xTotalCount returns when there is only query page 
    if (xTotalCount) {
        total = xTotalCount
    }
    let count = 0;
    // total of resgister is 10 for page
    if (total > 10) {
        count = parseInt(total / 10)
    }
    return { results: data, count, total: Number(total) }
}