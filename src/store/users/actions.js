import { getAllUsers, createOneUser, deleteOneUser } from "@/services/users";
const listUsers = async ({ commit }) => {
  const { data } = await getAllUsers();
  commit("SET_USERS", data);
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
