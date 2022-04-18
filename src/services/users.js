import api from "../api";

export const getUsers = async (page) => {
    return await api.get(`/users?_page=${page + 1}&_limit=10`);
}

export const filterUsers = async (name, lastNname, email) => {
    return await api.get(`/users?nome_like=${name}&sobrenome_like=${lastNname}&email_like=${email}`);
}