import { getAllUsers, createOneUser, deleteOneUser } from "@/services/users";
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
  dispatch("listUsers");
};

const deleteUser = async ({ dispatch }, id) => {
  await deleteOneUser(id);
  dispatch("listUsers");
};

export default { listUsers, createUser, deleteUser };
