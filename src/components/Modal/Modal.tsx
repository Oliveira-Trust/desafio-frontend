import React from 'react'
import { IModalContent } from '../../types/context'

interface IProps {
	content?: IModalContent
	show: boolean
	closeModal: () => void
}

const Modal = ({ content, show, closeModal }: IProps) => {
	if (!show) return null
	return (
		<div className='fixed inset-0  flex items-center justify-center'>
			<div
				onClick={closeModal}
				className='fixed inset-0 z-0 bg-black  bg-opacity-90'
			/>
			<div className='z-20 flex w-[600px] flex-col rounded bg-white p-5'>
				{content?.title && (
					<div className='flex grow flex-col'>
						<p className='text-xl font-bold'>{content?.title}</p>
						<hr className='my-4 h-0.5 border-t-0 bg-neutral-100 opacity-100' />
					</div>
				)}
				<div>{content?.content}</div>
			</div>
		</div>
	)
}

export default Modal
