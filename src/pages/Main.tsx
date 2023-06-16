import React, {
	useEffect,
	useState,
	useContext,
	useCallback,
	useRef,
} from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

import { WalletContext } from '../context/WalletProvider'
import { ToastContext } from '../context/ToastProvider'

import useApi from '../hooks/useApi'
import useCsv from '../hooks/useCsv'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import Table from '../components/Table'
import Pagination from '../components/Pagination'
import Footer from '../components/Footer'
import Modal from '../components/Modal'
import WalletForm from '../components/forms/WalletForm'
import DeleteForm from '../components/forms/DeleteForm'

import { columns, currencies, renameProperty } from '../utils/utils'
import { IUser } from '../types/user'
import { IUrlParams } from '../types/api'
import { GenericObject, IModalState } from '../types/utils'
import { AxiosError } from 'axios'
import Toast from '../components/Toast'

const initialState = {
	page: 1,
	limit: 10,
}
export default function Main() {
	const [urlParams, setUrlParams] = useState<IUrlParams>(initialState)
	const [modalState, setModalState] = useState<IModalState>()
	const exportBtn = useRef<HTMLButtonElement>(null)
	const emptyMessage = 'Nenhum registro encontrado.'
	const context = useContext(WalletContext)
	const toastContext = useContext(ToastContext)
	const successStatus = [200, 201]

	const getFileName = () => new Date().toISOString() + '.csv'

	const onComplete = (status: number, message: string) => {
		if (successStatus.includes(status)) {
			setModalState({ isOpen: false })
			load(urlParams)
			toastContext.fail(message)
		}
	}

	const onFailed = (message: string) => {
		toastContext.fail(message)
	}

	const onCsvFail = (message: string) => {
		toastContext.fail(message)
	}

	const { load, newUser, updateUser, deleteUser, getCurrency, getAll } =
		useApi({ onComplete, onFailed })

	const { csvDownload, ref: csvRef } = useCsv({
		onError: onCsvFail,
		getFileName,
	})

	useEffect(() => {
		getCurrency('BTC-BRL', 'BTCBRL')
	}, [])

	useEffect(() => {
		load(urlParams)
	}, [urlParams])

	const exportCsv = async () => {
		const data = await getAll(urlParams.search)
		csvDownload(data)
	}

	const onSearchSubimt = useCallback((search: GenericObject) => {
		Object.keys(search).map((key) => {
			renameProperty(key, key.replace('_search', ''), search)
		})

		setUrlParams({ ...urlParams, page: 1, search })
	}, [])

	const changePage = useCallback(
		(pageNumber: number) => {
			setUrlParams({ ...urlParams, page: pageNumber })
		},
		[context.currentPage, context.totalUsers]
	)

	const openWalletModal = useCallback(
		(data: IUser, callback: (data: IUser) => void, title?: string) => {
			setModalState({
				title: title || 'Editar Carteira',
				isOpen: true,
				content: (
					<WalletForm
						data={data}
						onSubmit={callback}
						closeModal={() => setModalState({ isOpen: false })}
					/>
				),
			})
		},
		[context.users]
	)

	const openRemoveModal = useCallback(
		(data: IUser, callback: (id?: number) => void) => {
			setModalState({
				isOpen: true,
				content: (
					<DeleteForm
						data={data}
						onSubmit={callback}
						closeModal={() => setModalState({ isOpen: false })}
					/>
				),
			})
		},
		[context.users]
	)

	const tableActions = [
		{
			icon: ['fas', 'pencil'] as IconProp,
			tooltip: 'Editar',
			callback: (data: IUser) => openWalletModal(data, updateUser),
		},
		{
			icon: ['fas', 'trash'] as IconProp,
			tooltip: 'Remover',
			callback: (data: IUser) => openRemoveModal(data, deleteUser),
		},
	]

	return (
		<div className='min-h-screen bg-zinc-100  flex justify-start items-stretch gap-4 flex-col'>
			<Header />
			<div className='container self-center flex justify-start gap-4  flex-col'>
				<div className='flex justify-between'>
					<h1 className='text-3xl font-bold'>BTC Carteiras </h1>
					<button
						ref={exportBtn}
						type='button'
						className='btn btn-blue'
						onClick={() =>
							openWalletModal({}, newUser, 'Adcionar Carteira')
						}>
						Adicionar Carteira
					</button>
				</div>
				<SearchBar onSubmit={onSearchSubimt} />
				<div className='bg-white shadow-md rounded px-8 pt-6 pb-6 flex flex-col gap-2'>
					<div className='flex justify-between'>
						<h1 className='text-2xl font-bold'>Carteiras </h1>
						<a ref={csvRef}></a>
						<button
							id='btnExport'
							type='button'
							className='btn btn-outline'
							onClick={(e) => exportCsv()}>
							Exportar CSV
						</button>
					</div>
					<Table
						columns={columns}
						data={context.users}
						actions={tableActions}
						emptyMessage={emptyMessage}
					/>
					<div className='flex justify-between mt-10'>
						<p className='text-sm text-gray-500'>
							{context.totalUsers || 0} registro(s)
						</p>
						{context.totalUsers && (
							<Pagination
								currentPage={context.currentPage}
								limit={10}
								total={context?.totalUsers}
								callback={changePage}
							/>
						)}
					</div>
				</div>
			</div>
			<Footer />
			<Modal
				show={modalState?.isOpen}
				title={modalState?.title}
				onHide={() => setModalState({ ...modalState, isOpen: false })}>
				{modalState?.content}
			</Modal>
		</div>
	)
}
