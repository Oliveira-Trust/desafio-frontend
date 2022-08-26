import api from "./../configs/api";
const getAllUsers = async () => {
  return await api.get("users");
};
export { getAllUsers };
