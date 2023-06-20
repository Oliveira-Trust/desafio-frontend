import React, { memo } from 'react'
import { GenericObject, ITableAction, ITableColumn } from '../../types/utils'
import { addColumnsSize, isArrayEmpty } from '../../utils/utils'
import Row from '../Row'
import Action from '../Action'

interface IProps {
	columns: ITableColumn[]
	data?: GenericObject[]
	actions?: ITableAction<GenericObject>[]
	emptyMessage: string
}

const Table = ({ columns, data, actions, emptyMessage }: IProps) => {
	const buildMessage = () => {
		return (
			<div className='flex justify-center p-5'>
				<p className='text-lg text-gray-500'>{emptyMessage}</p>
			</div>
		)
	}

	const buildRows = () => {
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
			{isArrayEmpty(data) ? buildMessage() : buildRows()}
		</div>
	)
}

export default memo(Table)
