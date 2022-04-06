import api from "../api";

export const getUsers = async () => {
    return await api.get('/users');
}