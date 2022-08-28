import api from "./../configs/api";
const getAllUsers = async ({ page, limit }) => {
  return await api.get(`users?_page=${page}&_limit=${limit}`);
};

const createOneUser = async (user) => {
  return await api.post("users", user);
};

const deleteOneUser = async (id) => {
  return await api.delete(`users/${id}`);
};

export { getAllUsers, createOneUser, deleteOneUser };
