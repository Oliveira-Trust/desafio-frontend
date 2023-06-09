import { currencies } from './../utils/utils';
import { GenericObject } from './../types/utils.d';
import { useContext, useState } from 'react'
import { create, list, remove, update } from "../apis/user";
import { list as listCurrency } from "../apis/currency"

import { IUrlParams, IUrlParamsCurrency } from '../types/api';
import { IUser } from './../types/user.d';
import { ICurrencies, IState } from '../types/context';
import { WalletContext } from '../context/WalletProvider';

interface UserApiConfig {
    onComplete?: (callback: (state: IState) => {}) => {}
}



export default function useUserApi({ onComplete }: UserApiConfig) {
    const context = useContext(WalletContext)

    const load = async (urlParams: IUrlParams) => {
        const response = await list(urlParams)
        context.setState(
            {
                ...context,
                users: response.data,
                totalUsers: response.headers['x-total-count'],
                currentPage: urlParams.page
            })
    }
    const newUser = async (user: IUser) => {
        const response = await create(user)

    }
    const updateUser = async (user: IUser) => {
        const response = await update(user)

    }
    const deleteUser = async (id: number) => {
        const response = await remove(id)

    }
    const getCurrency = async (currency: string, key: string) => {
        const response = await listCurrency(currency)
        context.setCurrency({
            base: response.data[key].code,
            to: response.data[key].codein,
            value: response.data[key].bid
        })
    }
    return {
        load,
        newUser,
        updateUser,
        deleteUser,
        getCurrency
    }


}