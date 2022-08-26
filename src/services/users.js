import api from "./../configs/api";
export default {
  getAllUsers: async () => {
    return await api.get("users");
  },
};
