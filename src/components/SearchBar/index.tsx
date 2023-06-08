import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import InnerLabelInput from '../forms/InnerLabelInput'
import { ISearchParams } from '../../types/api'
import { useForm } from 'react-hook-form'
import { GenericObject } from '../../types/utils'

interface Props {
    onSubmit: (search: GenericObject) => void
}

const SearchBar = ({ onSubmit }: Props) => {
    const { register, handleSubmit } = useForm()
    const [value, setValue] = useState<string>("")

    const handle = (evnet: any) => {
        evnet.preventDefault()
        console.log(evnet)
    }

    return (
        <div className='bg-white shadow-md rounded px-8 pt-6 pb-6'>
            <form className='flex justify-between gap-2' onSubmit={handleSubmit(onSubmit)} >
                <InnerLabelInput register={register} id='nome' label='Nome' placeholder='Nome' />
                <InnerLabelInput register={register} id='sobrenome' label='Sobrenome' placeholder='Sobrenome' />
                <InnerLabelInput register={register} id='email' label='E-mail' placeholder='E-mail' />
                <button type="submit" className='btn btn-outline'>
                    <p>
                        <FontAwesomeIcon icon={['fas', 'magnifying-glass']} /> Buscar
                    </p>
                </button>
            </form>
        </div>

    )
}

export default SearchBar