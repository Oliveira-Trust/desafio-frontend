import React, { memo, useEffect } from 'react'
import { GenericObject, ITableAction, ITableColumn } from '../../types/utils'
import { addColumnsSize, isArrayEmpty } from '../../utils/utils'
import Loading from '../Loading'
import Row from '../Row'
import Action from '../Action'

interface IProps {
	columns: ITableColumn[]
	data?: GenericObject[]
	actions?: ITableAction<GenericObject>[]
	emptyMessage?: string
	IsLoadingData: boolean
}

const Table = ({
	columns,
	data,
	actions,
	emptyMessage = 'Nenhum registro encontrado.',
	IsLoadingData,
}: IProps) => {
	const buildMessage = () => {
		return (
			<div className='flex justify-center p-5'>
				<p className='text-lg text-gray-500'>{emptyMessage}</p>
			</div>
		)
	}

	const buildRows = () => {
		if (isArrayEmpty(data)) {
			return buildMessage()
		}
		const newRows = data?.map((row, idx) => {
			let tableActions = actions?.map(
				({ callback, icon, tooltip }, idx) => {
					return (
						<Action
							key={idx}
							icon={icon}
							tooltip={tooltip}
							callback={callback}
							data={row}
						/>
					)
				}
			)
			return (
				<Row
					key={idx}
					data={row}
					columns={columns}
					actions={tableActions}
				/>
			)
		})
		return newRows
	}

	return (
		<div className='border-b-2'>
			<div
				style={addColumnsSize(columns.length)}
				className={`grid border-b-2 p-4`}>
				{columns.map(({ column }, idx) => {
					return (
						<p
							key={idx}
							className='text-lg font-medium'>
							{column}
						</p>
					)
				})}
			</div>
			{IsLoadingData ? (
				<div className='relative my-3 h-40 grid-cols-12'>
					<Loading />
				</div>
			) : (
				buildRows()
			)}
		</div>
	)
}

export default Table
