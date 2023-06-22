import React from 'react'

interface IProps {
	title?: string
	show?: boolean
	children?: JSX.Element
	onHide: () => void
}

const Modal = ({ title, show, children, onHide }: IProps) => {
	if (!show) return null
	return (
		<div className='fixed inset-0  flex items-center justify-center'>
			<div
				onClick={onHide}
				className='fixed inset-0 z-0 bg-black  bg-opacity-90'
			/>
			<div className='z-20 flex w-[600px] flex-col rounded bg-white p-5'>
				{title && (
					<div className='flex grow flex-col'>
						<p className='text-xl font-bold'>{title}</p>
						<hr className='my-4 h-0.5 border-t-0 bg-neutral-100 opacity-100' />
					</div>
				)}
				<div>{children}</div>
			</div>
		</div>
	)
}

export default Modal