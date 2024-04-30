import { http } from "./api.tsx";

export default {
  listar: () => {
    return http.get("users");
  },

  salvar: (users: object) => {
    return http.post("users", users);
  },

  atualizar: (user: any, id: string) => {
    return http.put(`users/${id}`, user);
  },

  deletar: (id: string) => {
    return http.delete(`users/${id}`);
  },
};
