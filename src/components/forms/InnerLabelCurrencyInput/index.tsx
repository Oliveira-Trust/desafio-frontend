import React from 'react'
import { CurrencyInput } from 'input-currency-react'

type IProps = {
	label: string
	className?: string
	id: string
	error?: string
	value: string
	onChange: (...event: string[]) => void
	currency: CurrenciesType
}

type CurrenciesType = 'BRL' | 'USD' | 'EUR'

const InnerLabelCurrencyInput = ({
	id,
	className,
	label,
	value,
	error,
	currency,
	onChange,
}: IProps) => {
	return (
		<div className={`relative flex-grow ${className}`}>
			<CurrencyInput
				id={id}
				value={value}
				options={{
					style: 'currency',
					allowNegative: false,
					i18nCurrency: currency,
				}}
				style={{ textAlign: 'start' }}
				onChangeEvent={(_, maskedValue) => {
					onChange(maskedValue)
				}}
				className=' block px-2.5 pb-1 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border  border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder:text-transparent focus:placeholder:text-gray-500'
			/>
			<label
				htmlFor={id}
				className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-2 scale-75 top-2  origin-[0] px-2.5 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-2 left-1`}>
				{label}
			</label>

			<div className=''>
				<p className='text-red-500 text-xs'>{error}</p>
			</div>
		</div>
	)
}

export default InnerLabelCurrencyInput
