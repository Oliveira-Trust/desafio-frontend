import axios from 'axios'

import { UrlParams, SearchParams } from './../types/api.d';
import { User } from '../types/user';

const baseURL = 'http://localhost:3004/users'
const api = axios.create({ baseURL })

export const list = async (urlParams: UrlParams) => {
    const { page, limit = 10, search } = urlParams
    const url = `?_page=${page}&_limit=${limit}`
    const searchQuery = buildSearchQuery(search)

    return await api.get(url + searchQuery)
}

export const create = async (user: User) => {
    return await api.post('', user)
}

export const update = async (user: User) => {
    return await api.put(`/${user.id}`, user)
}

export const remove = async (id: number) => {
    return await api.delete(`/${id}`)
}

const buildSearchQuery = (searchParams: SearchParams = {}) => {

    return Object.keys(searchParams)
        .reduce((searchBuilder, currentKey) => searchBuilder + `&${currentKey}_like=${searchParams[currentKey]}`, "")
}




