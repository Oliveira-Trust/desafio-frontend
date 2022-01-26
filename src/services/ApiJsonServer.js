import { JSONSERVER } from "./ApiAxios";

export default {
  lista: ({ payload }) => JSONSERVER.post("/users", payload),
  create: ({ payload }) => JSONSERVER.post("/users", payload),
};
