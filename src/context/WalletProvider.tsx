import React, { createContext, useContext, useState } from 'react'
import { IBaseProvider, IState, IWalletContext } from '../types/context'
import useExchangeRate from '../hooks/useExchangeRate'
import { useToastContext } from './ToastProvider'

export const WalletContext = createContext({} as IWalletContext)

export const useWalletContext = () => {
	const context = useContext(WalletContext)
	if (!context) {
		throw new Error('component must be rendered as child of WalletProvider')
	}
	return context
}

const initState = {
	urlParams: {
		page: 1,
		limit: 10,
	},
}
export const WalletProvider = ({ children }: IBaseProvider) => {
	const [state, setState] = useState<IState>(initState)
	const [isLoading, setIsLoading] = useState(true)
	const { fail } = useToastContext()

	const { exchangeRate } = useExchangeRate({
		exchangeCurrency: 'BTC-BRL',
		onFailed: fail,
	})

	return (
		<WalletContext.Provider
			value={{ state, setState, exchangeRate, isLoading, setIsLoading }}>
			{children}
		</WalletContext.Provider>
	)
}
