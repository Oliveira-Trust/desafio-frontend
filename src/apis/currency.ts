import axios from 'axios'

import { IUrlParams, ISearchParams } from './../types/api.d';
import { IUser } from '../types/user';

const baseURL = 'https://economia.awesomeapi.com.br'
const api = axios.create({ baseURL })

export const list = async (urlParams: string) => {
    return await api.get('/last/' + urlParams)
}

