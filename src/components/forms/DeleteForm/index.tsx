import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IUser } from '../../../types/user'

interface IProps {
	data: IUser
	onSubmit: (id?: number) => void
	closeModal: () => void
}

const DeleteForm = ({ data, onSubmit, closeModal }: IProps) => {
	return (
		<div
			className='flex flex-col gap-4
     justify-center items-center p-10'>
			<div className='border-4 rounded-full flex justify-center items-center border-red-500 w-24 h-24'>
				<FontAwesomeIcon
					icon={['fas', 'trash']}
					className='text-red-500 text-5xl'
				/>
			</div>
			<div className='flex flex-col justify-center items-center text-lg leading-none'>
				<p className='text-2xl font-bold'>Excluir Carteira</p>
				<small>Tem certeza que deseja excluir esta Carteira?</small>
				<small>Esta ação não poderá ser desfeita.</small>
			</div>
			<div className='flex flex-col gap-2 w-full '>
				<button
					onClick={() => onSubmit(data.id)}
					type='button'
					className='btn bg-red-500 hover:bg-red-700 text-white'>
					Excluir
				</button>
				<a
					className='self-center text-blue-500 hover:text-blue-500 cursor-pointer'
					onClick={() => closeModal()}>
					Cancelar
				</a>
			</div>
		</div>
	)
}

export default DeleteForm
