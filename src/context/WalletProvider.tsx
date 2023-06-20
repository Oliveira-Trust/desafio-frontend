import React, { createContext, useState } from 'react'
import {
	IExchangeRate,
	IWalletContext,
	IWalletProvider,
} from '../types/context'

export const WalletContext = createContext({} as IWalletContext)

export const WalletProvider = ({ children }: IWalletProvider) => {
	const [state, setState] = useState({})
	const [exchangeRate, setExchangeRate] = useState<IExchangeRate>({
		base: '',
		to: '',
		value: 0,
	})

	return (
		<WalletContext.Provider
			value={{ ...state, setState, exchangeRate, setExchangeRate }}>
			{children}
		</WalletContext.Provider>
	)
}
