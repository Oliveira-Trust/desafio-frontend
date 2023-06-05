import React, { createContext } from 'react';
import { list } from './apis/user'
import Header from "./components/Header";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import Main from './views/Main'
import { WalletContext } from './types/walletContext';


export default function App() {
  const Context = createContext<WalletContext>({})

  return (
    <Context.Provider value={{}}>
      <Main />
    </Context.Provider>

  )
}
library.add(fas, far)