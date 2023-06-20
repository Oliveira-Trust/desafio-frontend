import React, { createContext, useContext, useState } from 'react'
import { IWalletContext, IWalletProvider } from '../types/context'
import useExchangeRate from '../hooks/useExchangeRate'
import { ToastContext } from './ToastProvider'

export const WalletContext = createContext({} as IWalletContext)

export const WalletProvider = ({ children }: IWalletProvider) => {
	const [state, setState] = useState({})
	const toastContext = useContext(ToastContext)

	const onFailed = (message: string) => {
		toastContext.fail(message)
	}

	const { exchangeRate } = useExchangeRate({
		exchangeCurrency: 'BTC-BRL',
		onFailed,
	})

	return (
		<WalletContext.Provider value={{ ...state, setState, exchangeRate }}>
			{children}
		</WalletContext.Provider>
	)
}
