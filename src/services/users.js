import { http } from "./api.js";

export default {
  listar: () => {
    return http.get("users");
  },

  salvar: (users) => {
    return http.post("users", users);
  },

  atualizar: (users) => {
    return http.put(`users/${users.id}`, users);
  },

  deletar: (userId) => {
    return http.delete(`users/${userId}`);
  },
};
