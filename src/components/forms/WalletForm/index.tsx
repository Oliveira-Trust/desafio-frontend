import React, { useEffect } from 'react'
import { IUser } from '../../../types/user'
import InnerLabelInput from '../InnerLabelInput'
import { useForm } from "react-hook-form";
import { GenericObject } from '../../../types/utils';
import CustomSelect from '../CustomSelect';

interface IProps {
    data: IUser,
    onSubmit: (data: IUser) => void
}

const WalletForm = ({ data, onSubmit }: IProps) => {

    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm()
    const currencyValue = watch("value")

    useEffect(() => {
        console.log(currencyValue)
        setValue('value',currencyMask(currencyValue))
    }, [currencyValue])

    const OnValid = (formData: GenericObject) => {
        onSubmit(formData)
    }

    const onInvalid = () => {
        console.log(errors)
    }

    const options = [
        {
            label: 'BRL',
            value: 'BRL'
        },
        {
            label: 'USD',
            value: 'USD'
        }
    ]

    const currencyMask = (value: string) => {
        if (!value) return ''
        return "R$" + value.replace(/[R$]/g, '')
        // const aux = value.replace(/[R$€£]/g,"")
        // const f = new Intl.NumberFormat('en-us',{
        //     currency:'BRL',
        //     style:"currency"
        // })
        // console.log(value,aux, f.format(Number(aux)), typeof(aux),typeof(f.format(Number(aux))))
        // return(f.format(Number(aux)))
    }

    return (
        <form className='flex flex-col gap-5' onSubmit={handleSubmit(OnValid, onInvalid)}>
            <div className='grid grid-cols-12 grid-rows-4 gap-3'>
                <InnerLabelInput register={register}
                    options={{
                        required: true,
                        pattern: {
                            value: /^[A-Za-z]+$/i,
                            message: 'Insira um nome valido.'
                        }
                    }}
                    id='nome'
                    className='col-span-full'
                    label='Nome'
                    placeholder='Nome' />
                <InnerLabelInput register={register}
                    options={{
                        required: true,
                        pattern: {
                            value: /^[A-Za-z][A-Za-z.\s]+$/i,
                            message: 'Insira um sobrenome valido'
                        }
                    }}
                    id='sobrenome'
                    className='col-span-full'
                    label='Sobrenome'
                    placeholder='Sobrenome' />
                <InnerLabelInput register={register}
                    options={{
                        required: true,
                        pattern: {
                            value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i,
                            message: 'Insira um e-mail valido'
                        }
                    }}
                    id='email'
                    className='col-span-full'
                    label='E-mail'
                    placeholder='E-mail' />
                <CustomSelect register={register}
                    id='moeda'
                    options={options}
                    className='col-span-2' />
                <InnerLabelInput register={register}
                    options={{ required: true, min: 0 }}
                    id='value'
                    className='col-span-5'
                    label='Valor de compra'
                    placeholder='Valor de compra'
                    // prefix='R$'
                    type='number' />
                <div className='col-span-5 place-self-center justify-self-start'>
                    <p className='text-xl font-bold font-sans'>
                        {`BTC ${data.valor_carteira}`}
                    </p>
                </div>
            </div>
            <div className='flex justify-end items-center gap-3'>
                <a>Cancelar</a>
                <button type='submit' className='btn btn-blue'>
                    Adcionar
                </button>
            </div>
        </form>
    )
}

export default WalletForm