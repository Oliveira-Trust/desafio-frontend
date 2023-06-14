import React from 'react'
import { FieldValues, UseFormRegister, RegisterOptions } from 'react-hook-form'
import { IOptionInput } from '../../../types/utils'

interface IProps {
	id: string
	options: IOptionInput[]
	className?: string
	register: UseFormRegister<FieldValues>
	registerOptions?: RegisterOptions<FieldValues>
}

const CustomSelect = ({
	id,
	options,
	className,
	register,
	registerOptions,
}: IProps) => {
	return (
		<div className={`${className} reletive flex-grow`}>
			<select
				id={id}
				className='block pt-4 pb-1 px-2.5 w-full text-sm text-gray-500 bg-transparent rounded-lg border border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer'
				{...register(id, registerOptions)}>
				{options.map(({ label, value }, idx) => {
					return (
						<option
							key={idx}
							value={value}>
							{label}
						</option>
					)
				})}
			</select>
		</div>
	)
}

export default CustomSelect
