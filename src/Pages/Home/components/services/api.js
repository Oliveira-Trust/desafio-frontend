import axios from "axios";

export const http = axios.create({
  baseURL: "https://economia.awesomeapi.com.br/json/last/BTC-BRL",
});
