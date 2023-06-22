import React, { InputHTMLAttributes, memo } from 'react'
import { UseFormRegister } from 'react-hook-form'

interface Props {
	id: string
	label?: string
	className?: string
	register: UseFormRegister<any>
	error?: string
	props?: InputHTMLAttributes<{}>
}

const InnerLabelInput = ({
	label,
	className,
	register,
	id,
	error,
	props,
}: Props) => {
	return (
		<div className={`relative flex-grow ${className}`}>
			<input
				type={'text'}
				className={`peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-1  pt-4 text-sm text-gray-900 placeholder:text-transparent focus:border-blue-600 focus:outline-none focus:ring-0 focus:placeholder:text-gray-500`}
				{...register(id)}
				id={id}
				{...props}
			/>
			<label
				htmlFor={id}
				className={`absolute left-1 top-2 origin-[0] -translate-y-2 scale-75 transform px-2.5 text-sm  text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2  peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-2 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:text-gray-400`}>
				{label}
			</label>

			<div className=''>
				<p className='text-xs text-red-500'>{error}</p>
			</div>
		</div>
	)
}

export default memo(InnerLabelInput)
