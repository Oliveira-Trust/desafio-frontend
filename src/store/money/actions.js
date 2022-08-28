import { getBTCtoBRL } from "@/services/money";
const convertMoney = async ({ commit }) => {
  const { data } = await getBTCtoBRL();
  commit("SET_MONEY", data[0]);
};

export default { convertMoney };
