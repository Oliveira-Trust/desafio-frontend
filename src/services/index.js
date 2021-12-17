import { configAxios } from '@/utils/api-instance';

export const getUsersList = async (queryString = '') => {
    const api = configAxios();
    const { data, headers: { xTotalCount } } = await api.get('users/' + queryString);
    return { results: data, count: (xTotalCount / 10), total: Number(xTotalCount) }
}