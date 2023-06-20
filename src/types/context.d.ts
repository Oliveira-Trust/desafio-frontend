export interface IState {
	users?: IUser[]
	totalUsers?: number
	currentPage?: number
}

export interface IWalletContext extends IState {
	setState: (state: IState) => void
	setExchangeRate: (currency: IExchangeRate) => void
	exchangeRate: IExchangeRate
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
