import React, { useEffect, useState, useContext, useCallback } from 'react';
import { WalletContext } from '../context/WalletProvider';
import useApi from '../hooks/useApi'
import Header from "../components/Header";
import SearchBar from '../components/SearchBar';
import Table from "../components/Table";
import { columns } from "../utils/utils";
import { IUrlParams } from '../types/api';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';
import Modal from '../components/Modal';

const initialState = {
    page: 1,
    limit: 10,
}
export default function Main() {

    const [urlParams, setUrlParams] = useState<IUrlParams>(initialState)

    const { load, newUser, updateUser, deleteUser } = useApi({})
    const context = useContext(WalletContext)

    useEffect(() => {
        load(urlParams)
    }, [urlParams])

    const changePage = useCallback(
        (pageNumber: number) => {
            setUrlParams({ ...urlParams, page: pageNumber })
        },
        [context.currentPage, context.totalUsers],
    )

    return (
        <div className='min-h-screen bg-zinc-100  flex justify-start items-stretch gap-4 flex-col'>
            <Modal show={true} title='Adcionar Carteira' />
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
                <div className='bg-white shadow-md rounded px-8 pt-6 pb-6 flex flex-col gap-2'>
                    <div className='flex justify-between'>
                        <h1 className='text-2xl font-bold'>Carteiras </h1>
                        <button
                            type='button'
                            className='btn btn-outline'
                        >Exportar CSV</button>
                    </div>
                    <Table columns={columns} data={context.users} />
                    <div className='flex justify-between mt-10'>
                        <p className='text-sm text-gray-500'>
                            {context.totalUsers || 0} registro(s)
                        </p>
                        {context.totalUsers &&
                            <Pagination currentPage={context.currentPage} limit={10} total={context?.totalUsers} callback={changePage} />
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}