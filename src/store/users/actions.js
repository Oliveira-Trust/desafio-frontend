import { getAllUsers } from "@/services/users";
const listUsers = async ({ commit }) => {
  const { data } = await getAllUsers();
  commit("SET_USERS", data);
};

export default { listUsers };
