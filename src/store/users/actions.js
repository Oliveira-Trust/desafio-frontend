import { getAllUsers, createOneUser } from "@/services/users";
const listUsers = async ({ commit }) => {
  const { data } = await getAllUsers();
  commit("SET_USERS", data);
};

const createUser = async ({ dispatch }, user) => {
  await createOneUser(user);
  dispatch("listUsers");
};

export default { listUsers, createUser };
