import React, { InputHTMLAttributes, memo } from 'react'
import { FieldValues, UseFormRegister, RegisterOptions } from 'react-hook-form'

interface Props {
	label?: string
	prefix?: string
	placeholder?: string
	className?: string
	register: UseFormRegister<FieldValues>
	options?: RegisterOptions<FieldValues>
	type?: string
	id: string
	error?: string
	props?: InputHTMLAttributes<{}>
}

const InnerLabelInput = ({
	label,
	prefix,
	placeholder,
	className,
	register,
	options,
	id,
	type,
	error,
	props,
}: Props) => {
	return (
		<div className={`relative flex-grow ${className}`}>
			<input
				type={type || 'text'}
				className={`block ${
					prefix ? 'px-7' : 'px-2.5'
				} pb-1 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border  border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder:text-transparent focus:placeholder:text-gray-500`}
				{...register(id, options)}
				id={id}
				{...props}
			/>
			<label
				htmlFor={id}
				className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-2 scale-75 top-2  origin-[0] px-2.5 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-2 left-1`}>
				{label}
			</label>

			<div className=''>
				<p className='text-red-500 text-xs'>{error}</p>
			</div>

			<p className='peer-placeholder-shown:invisible peer-focus:visible visible absolute leading-normal top-4 left-2 text-sm'>
				{prefix}
			</p>
		</div>
	)
}

export default memo(InnerLabelInput)
