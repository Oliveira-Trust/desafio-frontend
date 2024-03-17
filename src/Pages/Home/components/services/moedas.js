import { http } from "./api.js";

export default {
  listarMoeda: () => {
    return http.get("");
  },
};
