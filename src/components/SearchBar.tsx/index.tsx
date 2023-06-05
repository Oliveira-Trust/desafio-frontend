import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import InnerLabelInput from '../forms/InnerLabelInput'
import { SearchParams } from '../../types/api'

interface Props {
    searchParams?: SearchParams
}

const SearchBar = (props: Props) => {
    const [value, setValue] = useState<string>("")

    const handle = (evnet:any) =>{
        evnet.preventDefault()
        console.log(evnet)
    } 

    return (
        <div className='bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4'>
            <form className='flex justify-between gap-2' onSubmit={handle} >
                <InnerLabelInput label='Nome' placeholder='Nome' value={value} onChange={() => { }} />
                <InnerLabelInput label='Sobrenome' placeholder='Sobrenome' />
                <InnerLabelInput label='E-mail' placeholder='E-mail' />
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