import axios from 'axios'

import { IUrlParams, ISearchParams } from './../types/api.d'
import { IUser } from '../types/user'

const baseURL = 'http://localhost:3004/users'
const api = axios.create({ baseURL })

export const list = (urlParams: IUrlParams) => {
	const { page, limit = 10, search } = urlParams
	const url = `?_page=${page}&_limit=${limit}&_sort=data_abertura&_order=desc`
	const searchQuery = buildSearchQuery(search)

	return api.get(url + searchQuery)
}

export const listAll = (search?: ISearchParams) => {
	const url = `?_sort=data_abertura&_order=desc`
	const searchQuery = buildSearchQuery(search)
	return api.get(url + searchQuery)
}

export const create = (user: IUser) => {
	return api.post('', user)
}

export const update = (user: IUser) => {
	return api.put(`/${user.id}`, user)
}

export const remove = (id: number) => {
	return api.delete(`/${id}`)
}

const buildSearchQuery = (searchParams: ISearchParams = {}) => {
	return Object.keys(searchParams).reduce(
		(searchBuilder, currentKey) =>
			searchBuilder + `&${currentKey}_like=${searchParams[currentKey]}`,
		''
	)
}
