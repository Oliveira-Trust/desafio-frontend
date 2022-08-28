import api from "./../configs/api";
import params from "./params";
const getAllUsers = async ({ page, limit, nome, sobrenome, email }) => {
  return await api.get(
    `users?${params.toParamns({
      _page: page,
      _limit: limit,
      nome_like: nome,
      sobrenome_like: sobrenome,
      email_like: email,
    })}`
  );
};

const createOneUser = async (user) => {
  return await api.post("users", user);
};

const deleteOneUser = async (id) => {
  return await api.delete(`users/${id}`);
};

export { getAllUsers, createOneUser, deleteOneUser };
