import React, { useEffect, useContext, useState, memo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { WalletContext } from '../../../context/WalletProvider'

import InnerLabelInput from '../InnerLabelInput'
import InnerLabelCurrencyInput from '../InnerLabelCurrencyInput'
import { IUser } from '../../../types/user'
import {
	fixedNumber,
	isObjectEmpty,
	parseCurrencyToNumber,
	parseNumberToCurrency,
} from '../../../utils/utils'
import { walletFormSchema, WalletFormData } from '../schemas/walletFormSchema'

interface IProps {
	data: IUser
	onSubmit: (data: IUser) => void
	closeModal: () => void
}

const WalletForm = ({ data, onSubmit, closeModal }: IProps) => {
	const { exchangeRate } = useContext(WalletContext)
	const [btcValue, setBtcValue] = useState(0)
	const { nome, sobrenome, email, valor_carteira } = data

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		watch,
	} = useForm<WalletFormData>({
		resolver: zodResolver(walletFormSchema),
		defaultValues: {
			nome,
			sobrenome,
			email,
			value: valor_carteira
				? parseNumberToCurrency(
						fixedNumber(valor_carteira * exchangeRate.value, 2)
				  ).toString()
				: 'R$ 0,00',
		},
	})

	const currencyValue = watch('value')

	const OnValid = (formData: WalletFormData) => {
		const { nome, email, sobrenome } = formData
		onSubmit({
			...data,
			nome,
			email,
			sobrenome,
			valor_carteira: fixedNumber(btcValue, 8),
		})
	}

	useEffect(() => {
		if (currencyValue && exchangeRate.value) {
			setBtcValue(
				parseCurrencyToNumber(currencyValue) / exchangeRate.value
			)
		}
	}, [currencyValue, exchangeRate])

	return (
		<form
			className='flex flex-col gap-5 p-5'
			onSubmit={handleSubmit(OnValid)}>
			<div className='flex flex-col items-stretch gap-3'>
				<InnerLabelInput
					register={register}
					id='nome'
					className='col-span-full'
					label='Nome'
					props={{ placeholder: 'Nome' }}
					error={errors?.nome?.message?.toString()}
				/>
				<InnerLabelInput
					register={register}
					id='sobrenome'
					className='col-span-full'
					label='Sobrenome'
					props={{ placeholder: 'Sobrenome' }}
					error={errors?.sobrenome?.message?.toString()}
				/>
				<InnerLabelInput
					register={register}
					id='email'
					className='col-span-full'
					label='E-mail'
					props={{ type: 'email', placeholder: 'E-mail' }}
					error={errors?.email?.message?.toString()}
				/>
				<div className='flex justify-stretch gap-2'>
					<Controller
						name='value'
						control={control}
						render={({ field: { value, onChange } }) => (
							<InnerLabelCurrencyInput
								id='value'
								className='col-span-2'
								label='Valor de Compra'
								value={value}
								onChange={onChange}
								error={errors.value?.message}
								currency='BRL'
							/>
						)}
					/>
					<div className='w-5/12 place-self-center justify-self-start'>
						<p className='truncate font-sans text-xl font-bold'>
							{`BTC ${btcValue.toFixed(8)}`}
						</p>
					</div>
				</div>
			</div>
			<div className='flex items-center justify-end gap-3'>
				<button
					type='button'
					className='cursor-pointer text-blue-500 hover:text-blue-500'
					onClick={() => closeModal()}>
					Cancelar
				</button>
				<button
					type='submit'
					className='btn btn-blue'>
					{isObjectEmpty(data) ? 'Adicionar' : 'Editar'}
				</button>
			</div>
		</form>
	)
}

export default memo(WalletForm)
