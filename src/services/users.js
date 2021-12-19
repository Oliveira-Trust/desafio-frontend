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
        count = (total / 10);
        // if count is float
        if (Number(count) === count && count % 1 !== 0) {
            count = parseInt(count + 1)
        }
    }
    return { results: data, count, total: Number(total) }
}

export const updateUserInList = async (user) => {
    const api = configAxios();
    await api.patch(`users/${user.id}`, user);
};

export const deleteUserInList = async (id) => {
    const api = configAxios();
    await api.delete(`users/${id}`);
};

export const createUserInList = async (user) => {
    const api = configAxios();
    await api.post(`users/`, user);
};