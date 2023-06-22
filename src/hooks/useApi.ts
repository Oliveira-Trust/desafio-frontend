import moment from 'moment-timezone'

import { create, remove, update } from '../apis/user'

import { IUser } from './../types/user.d'
import { ensureError, UserApiErrors } from '../utils/utils'

interface IUserApi {
	onComplete: (status: number, message: string) => void
	onFailed: (message: string) => void
}

export default function useUserApi({ onComplete, onFailed }: IUserApi) {
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
		newUser,
		updateUser,
		deleteUser,
	}
}
