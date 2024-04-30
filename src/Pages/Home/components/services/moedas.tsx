import { http } from "./api.tsx";

export default {
  listarMoeda: () => {
    return http.get("");
  },
};
