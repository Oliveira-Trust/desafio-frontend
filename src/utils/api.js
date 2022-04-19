import axios from "axios";
import { apiUrl, coinsApiUrl } from './endpoints';

export const api = axios.create({
   baseURL: apiUrl,
});

export const coinsApi = axios.create({
    baseURL: coinsApiUrl,
});