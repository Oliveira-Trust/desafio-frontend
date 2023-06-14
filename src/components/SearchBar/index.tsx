import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import InnerLabelInput from '../forms/InnerLabelInput'
import { useForm } from 'react-hook-form'
import { GenericObject } from '../../types/utils'

interface Props {
	onSubmit: (search: GenericObject) => void
}

const SearchBar = ({ onSubmit }: Props) => {
	const { register, handleSubmit } = useForm()

	return (
		<div className='bg-white shadow-md rounded px-8 pt-6 pb-6'>
			<form
				className='flex justify-between gap-2'
				onSubmit={handleSubmit(onSubmit)}>
				<InnerLabelInput
					register={register}
					id='nome_search'
					label='Nome'
					placeholder='Nome'
				/>
				<InnerLabelInput
					register={register}
					id='sobrenome_search'
					label='Sobrenome'
					placeholder='Sobrenome'
				/>
				<InnerLabelInput
					register={register}
					id='email_search'
					label='E-mail'
					placeholder='E-mail'
				/>
				<button
					type='submit'
					className='btn btn-outline'>
					<p>
						<FontAwesomeIcon icon={['fas', 'magnifying-glass']} />{' '}
						Buscar
					</p>
				</button>
			</form>
		</div>
	)
}

export default SearchBar
