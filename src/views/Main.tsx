import React, { useEffect, useState, useContext } from 'react';
import { WalletContext } from '../context/WalletProvider';
import useApi from '../hooks/useApi'
import Header from "../components/Header";
import SearchBar from '../components/SearchBar';
import Table from "../components/Table";
import { columns } from "../utils/utils";
import { list } from '../apis/user';
import { IUser } from '../types/user';
import Paginator from '../components/Paginator';


export default function Main() {

    const { load, newUser, updateUser, deleteUser } = useApi({})
    const context = useContext(WalletContext)

    useEffect(() => {
        load({ page: 1, limit: 10 })
    }, [])

    return (
        <div className='bg-zinc-100  flex justify-start items-stretch gap-4 flex-col'>
            <Header />
            <div className='container self-center flex justify-start gap-4  flex-col'>
                <div className='flex justify-between'>
                    <h1 className='text-3xl font-bold'>BTC Carteiras </h1>
                    <button
                        type='button'
                        className='btn btn-blue'
                    >Adicionar Carteira</button>
                </div>
                <SearchBar />
                <div className='bg-white shadow-md rounded px-8 pt-6 pb-6'>
                    <div className='flex justify-between'>
                        <h1 className='text-2xl font-bold'>Carteiras </h1>
                        <button
                            type='button'
                            className='btn btn-outline'
                        >Exportar CSV</button>
                    </div>
                    <Table columns={columns} data={context.users} />
                    <Paginator />
                </div>
            </div>
        </div>
    )
}