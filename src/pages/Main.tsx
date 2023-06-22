import React from 'react'

import { useToastContext } from '../context/ToastProvider'
import { useModalContext } from '../context/ModalProvider'
import { useWalletContext } from '../context/WalletProvider'

import useApi from '../hooks/useApi'

import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import Footer from '../components/Footer'
import WalletForm from '../components/forms/WalletForm'

import List from '../components/List'
import useLoadData from '../hooks/useLoadData'
import { successStatus } from '../utils/utils'

export default function Main() {
	const { success, fail } = useToastContext()
	const { closeModal, setContent, openModal } = useModalContext()
	const { state } = useWalletContext()

	const onComplete = (status: number, message: string) => {
		if (successStatus.includes(status)) {
			closeModal()
			load(state.urlParams)
			success(message)
		}
	}

	const { load } = useLoadData({ onFailed: fail })

	const { newUser } = useApi({
		onComplete,
		onFailed: fail,
	})

	const openWalletModal = () => {
		setContent({
			content: (
				<WalletForm
					data={{}}
					closeModal={closeModal}
					onSubmit={newUser}
				/>
			),
			title: 'Adcionar Carteira',
		})
		openModal()
	}

	return (
		<div className='flex min-h-screen flex-col items-stretch justify-start gap-4 bg-zinc-100'>
			<Header />
			<div className='container relative flex-1 self-center'>
				<div className='flex animate-showIn flex-col justify-start  gap-4'>
					<div className='flex justify-between'>
						<h1 className='text-3xl font-bold'>BTC Carteiras </h1>
						<button
							type='button'
							className='btn btn-blue'
							onClick={() => openWalletModal()}>
							Adicionar Carteira
						</button>
					</div>
					<SearchBar />
					<List />
				</div>
			</div>
			<Footer />
		</div>
	)
}
