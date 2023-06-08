import React, { memo } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

interface Props {
    label?: string
    placeholder?: string
    className?: string
    register: UseFormRegister<FieldValues>
    id: string
}

const InnerLabelInput = ({ label, placeholder, className, register, id }: Props) => {
    return (
        <div className={`relative flex-grow ${className}`}>
            <input type="text"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder:text-transparent focus:placeholder:text-gray-500"
                placeholder={placeholder || " "}
                {...register(id)}
                id={id}
            />
            <label htmlFor={id}
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-2 scale-75 top-2  origin-[0]  dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-2 left-1">{label}</label>
        </div>
    )
}

export default memo(InnerLabelInput)