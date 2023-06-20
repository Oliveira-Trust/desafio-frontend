import { useContext, useState } from 'react'
import moment from 'moment-timezone'

import { WalletContext } from '../context/WalletProvider'
import { create, list, remove, update, listAll } from '../apis/user'

import { ISearchParams, IUrlParams } from '../types/api'
import { IUser } from './../types/user.d'
import { ensureError, UserApiErrors } from '../utils/utils'

interface UserApiConfig {
	onComplete: (status: number, message: string) => void
	onFailed: (message: string) => void
}

export default function useUserApi({ onComplete, onFailed }: UserApiConfig) {
	const [isLoading, setIsLoading] = useState(false)

	const context = useContext(WalletContext)

	const load = async (urlParams: IUrlParams) => {
		setIsLoading(true)
		try {
			const response = await list(urlParams)
			context.setState({
				...context,
				users: response.data,
				totalUsers: response.headers['x-total-count'],
				currentPage: urlParams.page,
			})
		} catch (err) {
			const error = ensureError(err)
			console.error(error)
			onFailed(UserApiErrors.LIST_EXCEPTION)
		} finally {
			setIsLoading(false)
		}
	}
	const getAll = async (search?: ISearchParams) => {
		try {
			const response = await listAll(search)
			return response.data
		} catch (err) {
			const error = ensureError(err)
			console.error(error)
			onFailed(UserApiErrors.LIST_EXCEPTION)
		}
	}
	const newUser = async (user: IUser) => {
		try {
			const data_abertura = moment.tz().format()
			const response = await create({ ...user, data_abertura })
			onComplete(response.status, 'Carteira criada com sucesso.')
		} catch (err) {
			const error = ensureError(err)
			console.error(error)
			onFailed(UserApiErrors.NEW_USER_EXCEPTION)
		}
	}
	const updateUser = async (user: IUser) => {
		try {
			const response = await update(user)
			onComplete(response.status, 'Carteira atualizada com sucesso')
		} catch (err) {
			const error = ensureError(err)
			console.error(error)
			onFailed(UserApiErrors.UPDATE_USER_EXCEPTION)
		}
	}
	const deleteUser = async (id?: number) => {
		try {
			if (id) {
				const response = await remove(id)
				onComplete(response.status, 'Carteira removida com sucesso.')
			}
		} catch (err) {
			const error = ensureError(err)
			console.error(error)
			onFailed(UserApiErrors.REMOVE_EXCEPTION)
		}
	}

	return {
		load,
		newUser,
		updateUser,
		deleteUser,
		getAll,
		isLoading,
	}
}
