import axios from "axios";

const DEFAULT_API_URLS = {
  JSONSERVER: "http://localhost:3004/",
  BITCOIN: "https://economia.awesomeapi.com.br/",
};

const JSONSERVER = axios.create({
  baseURL: DEFAULT_API_URLS.JSONSERVER,
});

const BITCOIN = axios.create({
  baseURL: DEFAULT_API_URLS.BITCOIN,
});

export { JSONSERVER, BITCOIN };