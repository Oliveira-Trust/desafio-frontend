import React, { useEffect, useContext, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

import { WalletContext } from '../../../context/WalletProvider'
import InnerLabelInput from '../InnerLabelInput'
import { IUser } from '../../../types/user'
import { fixedNumber, isObjectEmpty } from '../../../utils/utils'

interface IProps {
	data: IUser
	onSubmit: (data: IUser) => void
	closeModal: () => void
}

interface IWalletForm extends IUser, FieldValues {
	value?: number
}

const WalletForm = ({ data, onSubmit, closeModal }: IProps) => {
	const context = useContext(WalletContext)
	const [btcValue, setBtcValue] = useState(0)

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
	} = useForm<IWalletForm>({
		defaultValues: {
			...data,
			value: data.valor_carteira
				? fixedNumber(data.valor_carteira * context.currency.value, 2)
				: undefined,
		},
	})

	const currencyValue = watch('value')

	useEffect(() => {
		if (currencyValue && context.currency.value) {
			setBtcValue(currencyValue / context.currency.value)
		}
	}, [currencyValue])

	const OnValid = (formData: IWalletForm) => {
		delete formData.value
		onSubmit({ ...formData, valor_carteira: fixedNumber(btcValue, 8) })
	}

	return (
		<form
			className='flex flex-col gap-5 p-5'
			onSubmit={handleSubmit(OnValid)}>
			<div className='flex flex-col gap-3 items-stretch'>
				<InnerLabelInput
					register={register}
					options={{
						required: {
							value: true,
							message: 'Este campo precisa ser preenchido.',
						},
						pattern: {
							value: /^[A-Za-z]+$/i,
							message: 'Insira um nome valido.',
						},
					}}
					id='nome'
					className='col-span-full'
					label='Nome'
					props={{ placeholder: 'Nome' }}
					error={errors?.nome?.message?.toString()}
				/>
				<InnerLabelInput
					register={register}
					options={{
						required: {
							value: true,
							message: 'Este campo precisa ser preenchido.',
						},
						pattern: {
							value: /^[A-Za-z][A-Za-z.\s]+$/i,
							message: 'Insira um sobrenome valido',
						},
					}}
					id='sobrenome'
					className='col-span-full'
					label='Sobrenome'
					props={{ placeholder: 'Sobrenome' }}
					error={errors?.sobrenome?.message?.toString()}
				/>
				<InnerLabelInput
					register={register}
					options={{
						required: {
							value: true,
							message: 'Este campo precisa ser preenchido.',
						},
						pattern: {
							value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
							message: 'Insira um e-mail valido',
						},
					}}
					id='email'
					className='col-span-full'
					label='E-mail'
					props={{ placeholder: 'E-mail' }}
					error={errors?.email?.message?.toString()}
				/>
				<div className='flex justify-stretch gap-2'>
					<InnerLabelInput
						register={register}
						options={{
							required: {
								value: true,
								message: 'Este campo precisa ser preenchido.',
							},
							min: {
								value: 0,
								message: 'Insira uma valor valido.',
							},
						}}
						id='value'
						className='col-span-2'
						label='Valor de compra'
						prefix='R$'
						props={{
							type: 'number',
							placeholder: 'Valor de compra',
							step: '0.01',
						}}
					/>
					<div className='w-5/12 place-self-center justify-self-start'>
						<p className='text-xl font-bold font-sans'>
							{`BTC ${btcValue.toFixed(8)}`}
						</p>
					</div>
				</div>
			</div>
			<div className='flex justify-end items-center gap-3'>
				<a
					className='text-blue-500 hover:text-blue-500 cursor-pointer'
					onClick={() => closeModal()}>
					Cancelar
				</a>
				<button
					type='submit'
					className='btn btn-blue'>
					{isObjectEmpty(data) ? 'Adicionar' : 'Editar'}
				</button>
			</div>
		</form>
	)
}

export default WalletForm
