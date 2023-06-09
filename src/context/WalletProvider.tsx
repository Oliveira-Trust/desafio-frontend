import React, { createContext, useState } from 'react'
import { ICurrencies, IWalletContext, IWalletProvider } from '../types/context'

export const WalletContext = createContext({} as IWalletContext)

export const WalletProvider = ({ children }: IWalletProvider) => {
    const [state, setState] = useState({})
    const [currency, setCurrency] = useState<ICurrencies>({ base: "", to: "", value: 0 })

    return (
        <WalletContext.Provider value={{ ...state, setState, currency, setCurrency }}>
            {children}
        </WalletContext.Provider>
    )

}