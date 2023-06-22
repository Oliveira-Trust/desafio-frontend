import React from 'react'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import Main from './pages/Main'
import { WalletProvider } from './context/WalletProvider'
import { ToastProvider } from './context/ToastProvider'
import { ModalProvider } from './context/ModalProvider'

export default function App() {
	return (
		<ToastProvider>
			<WalletProvider>
				<ModalProvider>
					<Main />
				</ModalProvider>
			</WalletProvider>
		</ToastProvider>
	)
}
library.add(fas, far)
