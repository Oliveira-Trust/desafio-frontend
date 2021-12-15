import { configAxios } from '@/utils/api-instance';

export const getUsersList = async (queryString = '') => {
    const api = configAxios();
    const { data } = await api.get('users/' + queryString)
    console.log(data);
}