import React, { createContext } from 'react';
import { list } from './apis/user'
import Header from "./components/Header";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import Main from './views/Main'
import { WalletProvider } from './context/WalletProvider';

export default function App() {

  return (
    <WalletProvider>
      <Main />
    </WalletProvider>
  )
}
library.add(fas, far)