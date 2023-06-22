import { IUrlParams } from './api'

export interface IState {
	users?: IUser[]
	totalUsers?: number
	currentPage?: number
	urlParams: IUrlParams
}

export interface IWalletContext {
	state: IState
	exchangeRate: IExchangeRate
	isLoading: boolean
	setState: (state: IState) => void
	setIsLoading: (isLoading: boolean) => void
}

export interface IToastContext {
	success: (message: string) => void
	fail: (message: string) => void
}

export interface IExchangeRate {
	base: string
	to: string
	value: number
}

export interface IBaseProvider {
	children: JSX.Element
}

export interface IModalContext {
	setContent: (content: IModalContent) => void
	openModal: () => void
	closeModal: () => void
}

export interface IModalContent {
	content?: React.ReactNode
	title?: string
}
