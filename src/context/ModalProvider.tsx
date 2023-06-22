import { createContext, useContext, useState } from 'react'
import Modal from '../components/Modal/Modal'
import { IBaseProvider, IModalContent, IModalContext } from '../types/context'

export const ModalContext = createContext<IModalContext | null>(null)

export const useModalContext = () => {
	const context = useContext(ModalContext)
	if (!context) {
		throw new Error('component must be rendered as child of ModalProvider')
	}
	return context
}

export const ModalProvider = ({ children }: IBaseProvider) => {
	const [content, setContent] = useState<IModalContent>()
	const [show, setShow] = useState(false)

	const openModal = () => setShow(true)
	const closeModal = () => setShow(false)

	return (
		<ModalContext.Provider value={{ setContent, openModal, closeModal }}>
			{children}
			<Modal
				content={content}
				show={show}
				closeModal={closeModal}
			/>
		</ModalContext.Provider>
	)
}
