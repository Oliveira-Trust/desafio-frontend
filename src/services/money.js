import api from "./../configs/api";
const getBTCtoBRL = async () => {
  return await api({
    method: "get",
    baseURL: "https://economia.awesomeapi.com.br/xml/BTC-BRL/",
    url: "1?format=json",
  });
};
export { getBTCtoBRL };
