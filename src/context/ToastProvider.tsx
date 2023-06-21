import React, { createContext, useState } from 'react'
import { IToastContext, IToastProvider } from '../types/context'
import Toast from '../components/Toast'

export const ToastContext = createContext({} as IToastContext)

export const ToastProvider = ({ children }: IToastProvider) => {
	const [toast, setToast] = useState<JSX.Element>()

	const close = () => {
		setTimeout(() => {
			setToast(undefined)
		}, 5000)
	}

	const success = (message: string) => {
		const component = (
			<Toast
				key={Date.now()}
				className='animate-toastIn px-3 pt-3 pb-2 rounded-md border bg-opacity-90 text-gray-700 bg-green-300 border-opacity-50 border-green-300'
				message={message}
			/>
		)
		setToast(component)

		close()
	}

	const fail = (message: string) => {
		const component = (
			<Toast
				key={Date.now()}
				className='animate-toastIn px-3 pt-3 pb-2 rounded-md border bg-opacity-90 text-gray-700 bg-red-300 border-opacity-50 border-red-300'
				message={message}
			/>
		)
		setToast(component)

		close()
	}

	return (
		<ToastContext.Provider value={{ success, fail }}>
			{children}
			<div className='absolute top-0 left-1/2 -translate-x-1/2 font-semibold text-md z-50'>
				{toast}
			</div>
		</ToastContext.Provider>
	)
}
