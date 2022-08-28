import api from "./../configs/api";
const getAllUsers = async () => {
  return await api.get("users");
};

const createOneUser = async (user) => {
  return await api.post("users", user);
};

const deleteOneUser = async (id) => {
  return await api.delete(`users/${id}`);
};

export { getAllUsers, createOneUser, deleteOneUser };
