import React, { memo, useState, useEffect } from 'react'
import { GenericObject, ITableAction, ITableColumn } from '../../types/utils'
import { addColumnsSize } from '../../utils/utils'
import Row from '../Row'
import Action from '../Action'

interface IProps {
  columns: ITableColumn[]
  data?: GenericObject[]
  actions?: ITableAction<GenericObject>[]
}

const Table = ({ columns, data, actions }: IProps) => {

  const [Rows, setRows] = useState<JSX.Element[]>()

  useEffect(() => {
    buildRows()
  }, [data])

  const buildRows = () => {
    const newRows = data?.map((row, idx) => {
      let tableActions = actions?.map(({ callback, icon, tooltip }, idx) => {
        return (
          <Action icon={icon} tooltip={tooltip} callback={callback} data={row} />
        )
      })
      return (
        <Row key={idx} data={row} columns={columns} actions={tableActions} />
      )
    })
    setRows(newRows)
  }

  return (
    <div className='border-b-2'>
      <div style={addColumnsSize(columns.length)} className={`grid border-b-2 p-4`} >
        {columns.map(({ column }, idx) => {
          return (
            <p key={idx} className='text-lg font-medium'>{column}</p>
          )
        })}
      </div>
      {Rows}
    </div>
  )
}

export default memo(Table)