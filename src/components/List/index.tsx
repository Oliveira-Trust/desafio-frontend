import React, { useCallback, useEffect } from 'react'

import { useWalletContext } from '../../context/WalletProvider'
import { useToastContext } from '../../context/ToastProvider'
import { useModalContext } from '../../context/ModalProvider'

import Table from '../Table'
import Pagination from '../Pagination'

import { columns, successStatus } from '../../utils/utils'
import { IUser } from '../../types/user'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

import useCsv from '../../hooks/useCsv'
import useApi from '../../hooks/useApi'
import useLoadData from '../../hooks/useLoadData'
import WalletForm from '../forms/WalletForm'
import DeleteForm from '../forms/DeleteForm'

const List = () => {
	const { state, isLoading } = useWalletContext()
	const { success, fail } = useToastContext()
	const { setContent, openModal, closeModal } = useModalContext()
	const { load, getAll } = useLoadData({ onFailed: fail })

	const getFileName = () => new Date().toISOString() + '.csv'
	const onComplete = (status: number, message: string) => {
		if (successStatus.includes(status)) {
			closeModal()
			load(state.urlParams)
			success(message)
		}
	}

	const { updateUser, deleteUser } = useApi({
		onComplete,
		onFailed: fail,
	})
	const { csvDownload } = useCsv({
		getFileName,
		onFailed: fail,
	})

	const exportCsv = async () => {
		const data = await getAll(state.urlParams.search)
		if (data) {
			csvDownload(data)
		}
	}

	const changePage = useCallback(
		(pageNumber: number) => {
			load({ ...state.urlParams, page: pageNumber })
		},
		[state.urlParams, load]
	)

	const openWalletModal = (data: IUser, callback: (data: IUser) => void) => {
		setContent({
			title: 'Editar Carteira',
			content: (
				<WalletForm
					data={data}
					onSubmit={callback}
					closeModal={closeModal}
				/>
			),
		})
		openModal()
	}
	const openRemoveModal = (data: IUser, callback: (id?: number) => void) => {
		setContent({
			content: (
				<DeleteForm
					data={data}
					onSubmit={callback}
					closeModal={closeModal}
				/>
			),
		})
		openModal()
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
		load(state.urlParams)
		// eslint-disable-next-line
	}, [])

	return (
		<div className='flex flex-col gap-2 rounded bg-white px-8 pb-6 pt-6 shadow-md'>
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
				data={state.users}
				actions={tableActions}
				IsLoadingData={isLoading}
			/>
			<div className='mt-10 flex justify-between'>
				<p className='text-sm text-gray-500'>
					{state.totalUsers || 0} registro(s)
				</p>
				<Pagination
					currentPage={state.currentPage}
					limit={state.urlParams.limit}
					total={state?.totalUsers}
					callback={changePage}
				/>
			</div>
		</div>
	)
}

export default List
