import React, { createContext,useState } from 'react'
import { IWalletContext, IWalletProvider } from '../types/context'

export const WalletContext = createContext<IWalletContext>({} as IWalletContext)

export const WalletProvider = ({ children }: IWalletProvider) => {
    const [state,setState] = useState({})

    return (
        <WalletContext.Provider value={{...state,setState}}>
            {children}
        </WalletContext.Provider>
    )

}