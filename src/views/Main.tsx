import React, { useEffect, useState, useContext } from 'react';
import { WalletContext } from '../context/WalletProvider';
import useApi from '../hooks/useApi'
import Header from "../components/Header";
import SearchBar from '../components/SearchBar.tsx';
import { list } from '../apis/user';
import { IUser } from '../types/user';


export default function Main() {

    const {load, newUser, updateUser, deleteUser} = useApi({})
    const context = useContext(WalletContext)

    useEffect(() => {
        load({ page: 1, limit: 10})        
    }, [])

    return (
        <div className='bg-zinc-100 h-screen flex justify-start items-stretch  flex-col gap-10'>
            <Header />
            <div className='container self-center flex justify-start gap-9 flex-col'>
                <div className='flex justify-between'>
                    <h1 className='text-3xl font-bold'>BTC Carteiras </h1>
                    <button
                        type='button'
                        className='btn btn-blue'
                    >Adicionar Carteira</button>
                </div>
                <SearchBar />
                <p>{JSON.stringify(context.users)}</p>
            </div>
        </div>
    )
}