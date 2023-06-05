import { useContext, useState } from 'react'
import { create, list, remove, update } from "../apis/user";

import { IUrlParams } from '../types/api';
import { IUser } from './../types/user.d';
import { IState } from '../types/context';
import { WalletContext } from '../context/WalletProvider';

interface UserApiConfig {
    onComplete?: (callback: (state: IState) => {}) => {}
}



export default function useUserApi({ onComplete }: UserApiConfig) {

    const context = useContext(WalletContext)

    const load = async (urlParams: IUrlParams) => {
        const response = await list(urlParams)
        context.setState({...context,users:response.data})
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
    return {
        load,
        newUser,
        updateUser,
        deleteUser
    }


}