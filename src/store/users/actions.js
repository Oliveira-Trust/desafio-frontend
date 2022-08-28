import {
  getAllUsers,
  createOneUser,
  deleteOneUser,
  updateOneUser,
} from "@/services/users";
const listUsers = async (
  { commit },
  { page, limit, nome, sobrenome, email }
) => {
  const { data, headers } = await getAllUsers({
    page,
    limit,
    nome,
    sobrenome,
    email,
  });
  commit("SET_USERS", data);
  commit("SET_COUNT", headers["x-total-count"]);
};

const createUser = async ({ dispatch }, user) => {
  await createOneUser(user);
  dispatch("listUsers", { page: 1, limit: 10 });
};

const updateUser = async ({ dispatch }, { id, user }) => {
  await updateOneUser({ id, user });
  dispatch("listUsers", { page: 1, limit: 10 });
};

const deleteUser = async ({ dispatch }, id) => {
  await deleteOneUser(id);
  dispatch("listUsers", { page: 1, limit: 10 });
};

export default { listUsers, createUser, deleteUser, updateUser };
