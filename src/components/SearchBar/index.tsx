import React, { useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import InnerLabelInput from '../forms/InnerLabelInput'
import { useForm } from 'react-hook-form'
import { GenericObject } from '../../types/utils'
import { useWalletContext } from '../../context/WalletProvider'
import { renameProperty } from '../../utils/utils'
import useLoadData from '../../hooks/useLoadData'
import { useToastContext } from '../../context/ToastProvider'

const SearchBar = () => {
	const { state } = useWalletContext()
	const { fail } = useToastContext()
	const { load } = useLoadData({ onFailed: fail })

	const SearchData = useCallback(
		(search: GenericObject) => {
			Object.keys(search).forEach((key) => {
				renameProperty(key, key.replace('_search', ''), search)
			})

			load({ ...state.urlParams, page: 1, search })
		},
		[load, state.urlParams]
	)

	const { register, handleSubmit } = useForm()

	return (
		<div className='rounded bg-white px-8 pb-6 pt-6 shadow-md'>
			<form
				className='flex justify-between gap-2'
				onSubmit={handleSubmit(SearchData)}>
				<InnerLabelInput
					register={register}
					id='nome_search'
					label='Nome'
					props={{ placeholder: 'Nome' }}
				/>
				<InnerLabelInput
					register={register}
					id='sobrenome_search'
					label='Sobrenome'
					props={{ placeholder: 'Sobrenome' }}
				/>
				<InnerLabelInput
					register={register}
					id='email_search'
					label='E-mail'
					props={{ placeholder: 'E-mail' }}
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
