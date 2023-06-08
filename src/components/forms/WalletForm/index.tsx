import React from 'react'
import { IUser } from '../../../types/user'
import InnerLabelInput from '../InnerLabelInput'

interface IProps {
    data: IUser,
    onSubmit?: (data: IUser) => void
}

const WalletForm = (props: IProps) => {
    return (
        <form className='flex flex-col gap-5'>
            <div className='grid grid-cols-4 grid-rows-4 gap-3'>
                <InnerLabelInput className='col-span-4' label='Nome' placeholder='Nome' />
                <InnerLabelInput className='col-span-4' label='Sobrenome' placeholder='Sobrenome' />
                <InnerLabelInput className='col-span-4' label='E-mail' placeholder='E-mail' />
                <InnerLabelInput className='col-span-2' label='Valor de compra' placeholder='Valor de compra' />
                <div className='col-span-2 place-self-center justify-self-start'>
                    <p className='text-xl font-bold font-sans'>
                        BTC 0.12345
                    </p>
                </div>
            </div>
            <div className='flex justify-end items-center gap-3'>
                <a>Cancelar</a>
                <button onClick={() => props.onSubmit?.(props.data)} type='submit' className='btn btn-blue'>
                    Adcionar
                </button>
            </div>
        </form>
    )
}

export default WalletForm