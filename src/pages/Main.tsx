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

import { columns, renameProperty } from '../utils/utils'
import { IUser } from '../types/user'
import { IUrlParams } from '../types/api'
import { GenericObject, IModalState } from '../types/utils'

const initialState = {
	page: 1,
	limit: 10,
}
export default function Main() {
	const [urlParams, setUrlParams] = useState<IUrlParams>(initialState)
	const [modalState, setModalState] = useState<IModalState>()
	const exportBtn = useRef<HTMLButtonElement>(null)
	const emptyMessage = 'Nenhum registro encontrado.'
	const successStatus = [200, 201]

	const toastContext = useContext(ToastContext)
	const context = useContext(WalletContext)

	const getFileName = () => new Date().toISOString() + '.csv'
	const onComplete = (status: number, message: string) => {
		if (successStatus.includes(status)) {
			setModalState({ isOpen: false })
			load(urlParams)
			toastContext.success(message)
		}
	}
	const onFailed = (message: string) => {
		toastContext.fail(message)
	}

	const { load, newUser, updateUser, deleteUser, getAll, isLoading } = useApi(
		{
			onComplete,
			onFailed,
		}
	)
	const { csvDownload } = useCsv({
		getFileName,
		onFailed,
	})

	const exportCsv = async () => {
		const data = await getAll(urlParams.search)
		if (data) {
			csvDownload(data)
		}
	}
	const onSearchSubimt = useCallback(
		(search: GenericObject) => {
			Object.keys(search).forEach((key) => {
				renameProperty(key, key.replace('_search', ''), search)
			})

			setUrlParams({ ...urlParams, page: 1, search })
		},
		[urlParams]
	)
	const changePage = useCallback(
		(pageNumber: number) => {
			setUrlParams({ ...urlParams, page: pageNumber })
		},
		[urlParams]
	)
	const openWalletModal = (
		data: IUser,
		callback: (data: IUser) => void,
		title?: string
	) => {
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
	}
	const openRemoveModal = (data: IUser, callback: (id?: number) => void) => {
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
	}
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

	useEffect(() => {
		load(urlParams)
		// eslint-disable-next-line
	}, [urlParams])

	return (
		<div className='min-h-screen bg-zinc-100  flex justify-start items-stretch gap-4 flex-col'>
			<Header />
			<div className='container flex-1 relative self-center'>
				<div className='animate-showIn flex justify-start gap-4  flex-col'>
					<div className='flex justify-between'>
						<h1 className='text-3xl font-bold'>BTC Carteiras </h1>
						<button
							ref={exportBtn}
							type='button'
							className='btn btn-blue'
							onClick={() =>
								openWalletModal(
									{},
									newUser,
									'Adcionar Carteira'
								)
							}>
							Adicionar Carteira
						</button>
					</div>
					<SearchBar onSubmit={onSearchSubimt} />
					<div className='bg-white shadow-md rounded px-8 pt-6 pb-6 flex flex-col gap-2'>
						<div className='flex justify-between'>
							<h1 className='text-2xl font-bold'>Carteiras </h1>
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
							data={context.state.users}
							actions={tableActions}
							emptyMessage={emptyMessage}
							IsLoadingData={isLoading}
						/>
						<div className='flex justify-between mt-10'>
							<p className='text-sm text-gray-500'>
								{context.state.totalUsers || 0} registro(s)
							</p>
							<Pagination
								currentPage={context.state.currentPage}
								limit={10}
								total={context.state?.totalUsers}
								callback={changePage}
							/>
						</div>
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
