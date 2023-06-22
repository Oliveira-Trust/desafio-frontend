import React, { createContext, useContext, useState } from 'react'
import { IBaseProvider, IToastContext } from '../types/context'
import Toast from '../components/Toast'

export const ToastContext = createContext({} as IToastContext)

export const useToastContext = () => {
	const context = useContext(ToastContext)
	if (!context) {
		throw new Error('component must be rendered as child of ToastProvider')
	}
	return context
}

export const ToastProvider = ({ children }: IBaseProvider) => {
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
				className='animate-toastIn rounded-md border border-green-300 border-opacity-50 bg-green-300 bg-opacity-90 px-3 pb-2 pt-3 text-gray-700'
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
				className='animate-toastIn rounded-md border border-red-300 border-opacity-50 bg-red-300 bg-opacity-90 px-3 pb-2 pt-3 text-gray-700'
				message={message}
			/>
		)
		setToast(component)

		close()
	}

	return (
		<ToastContext.Provider value={{ success, fail }}>
			{children}
			<div className='text-md absolute left-1/2 top-0 z-50 -translate-x-1/2 font-semibold'>
				{toast}
			</div>
		</ToastContext.Provider>
	)
}
