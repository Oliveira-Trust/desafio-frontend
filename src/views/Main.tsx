import React, { useEffect, useState, useContext } from 'react';
import { list } from '../apis/user'
import Header from "../components/Header";
import SearchBar from '../components/SearchBar.tsx';

export default function App() {
    const [teste, setTeste] = useState()

    useEffect(() => {
        ; (async () => {
            await list({ page: 1, limit: 12, search: { nome: "dor", sobrenome: 'po', email: 'adsasda' } })
        })()
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
            </div>
        </div>
    )
}