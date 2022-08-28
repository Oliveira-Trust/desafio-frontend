import api from "./../configs/api";
const getAllUsers = async () => {
  return await api.get("users");
};

const createOneUser = async (user) => {
  return await api.post("users", user);
};

export { getAllUsers, createOneUser };
