import { useContext } from 'react'
import moment from 'moment-timezone'

import { WalletContext } from '../context/WalletProvider'
import { create, list, remove, update, listAll } from '../apis/user'
import { list as listCurrency } from '../apis/currency'

import { ISearchParams, IUrlParams } from '../types/api'
import { IUser } from './../types/user.d'
import { AxiosError } from 'axios'

interface UserApiConfig {
	onComplete: (status: number) => void
	onFailed: (exception: AxiosError) => void
}

export default function useUserApi({ onComplete, onFailed }: UserApiConfig) {
	const context = useContext(WalletContext)

	const load = async (urlParams: IUrlParams) => {
		try {
			const response = await list(urlParams)
			context.setState({
				...context,
				users: response.data,
				totalUsers: response.headers['x-total-count'],
				currentPage: urlParams.page,
			})
		} catch (e) {
			const error = e as AxiosError
			onFailed(error)
		}
	}
	const newUser = async (user: IUser) => {
		try {
			const data_abertura = moment.tz().format()
			const response = await create({ ...user, data_abertura })
			onComplete(response.status)
		} catch (e) {
			const error = e as AxiosError
			onFailed(error)
		}
	}
	const updateUser = async (user: IUser) => {
		try {
			const response = await update(user)
			onComplete(response.status)
		} catch (e) {
			const error = e as AxiosError
			onFailed(error)
		}
	}
	const deleteUser = async (id?: number) => {
		try {
			if (id) {
				const response = await remove(id)
				onComplete(response.status)
			}
		} catch (e) {
			const error = e as AxiosError
			onFailed(error)
		}
	}
	const getCurrency = async (currency: string, key: string) => {
		try {
			const response = await listCurrency(currency)
			context.setCurrency({
				base: response.data[key].code,
				to: response.data[key].codein,
				value: response.data[key].bid,
			})
		} catch (e) {
			const error = e as AxiosError
			onFailed(error)
		}
	}
	const getAll = async (search?: ISearchParams) => {
		try {
			const response = await listAll(search)
			console.log(response)
			return response.data
		} catch (e) {
			const error = e as AxiosError
			onFailed(error)
		}
	}
	return {
		load,
		newUser,
		updateUser,
		deleteUser,
		getCurrency,
		getAll,
	}
}
