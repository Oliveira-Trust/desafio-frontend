export interface IState {
	users?: IUser[]
	totalUsers?: number
	currentPage?: number
}

export interface IWalletContext {
	state: IState
	exchangeRate: IExchangeRate
	setState: (state: IState) => void
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

export interface IWalletProvider {
	children: JSX.Element
}

export interface IToastProvider {
	children: JSX.Element
}
