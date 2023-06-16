import { GenericObject } from '../types/utils'

export const columns = [
	{
		column: 'Nome',
		key: 'nome',
	},
	{
		column: 'Sobrenome',
		key: 'sobrenome',
	},
	{
		column: 'Email',
		key: 'email',
	},
	{
		column: 'Bitcoin',
		key: 'valor_carteira',
	},
]

export const currencies = ['BTC-BRL']

export const addColumnsSize = (size: number) => {
	return {
		gridTemplateColumns: `repeat(${size}, minmax(0, 1fr)) 50px`,
	}
}

export const actions = [
	{
		icon: ['fas', 'pencil'],
		tooltip: 'Editar',
	},
	{
		icon: ['fas', 'trash'],
		tooltip: 'Remover',
	},
]

export const fixedNumber = (num: number, step: number) => {
	return Number(num.toFixed(step))
}

export const renameProperty = function (
	oldName: string,
	newName: string,
	obj: GenericObject
) {
	if (oldName === newName) {
		return obj
	}

	if (obj.hasOwnProperty(oldName)) {
		obj[newName] = obj[oldName]
		delete obj[oldName]
	}
	return obj
}

export const isArrayEmpty = <T>(array?: T[]) => {
	if (array?.length === 0 || array === undefined) return true
	return false
}

export const isObjectEmpty = (obj?: GenericObject) => {
	if (obj === undefined || Object.keys(obj).length === 0) return true
	return false
}

export const ensureError = (value: unknown): Error => {
	if (value instanceof Error) return value
	let stringified = JSON.stringify(value)
	return new Error(stringified)
}

export enum UserApiErrors {
	LIST_EXCEPTION = 'Não foi possível carregar a lista.',
	NEW_USER_EXCEPTION = 'Não foi possível criar uma nova carteira.',
	UPDATE_USER_EXCEPTION = 'Não foi possível atualizar a carteira.',
	REMOVE_EXCEPTION = 'Não foi possível remover a carteira.',
}

export enum CurrencyApiErrors {
	LOAD_CURRENCY_EXCEPTION = 'Não foi possível carregar a cotação atualizada.',
}
export enum CsvErrors {
	EXPORT_CSV_EXCEPTION = 'Não foi possível exportar a tabela.',
}
