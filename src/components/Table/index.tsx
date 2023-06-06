import React, { memo, useState, useEffect } from 'react'
import { ITableColumn } from '../../types/utils'
import { IUser } from '../../types/user'
import { addColumnsSize } from '../../utils/utils'
import Row from '../Row'

interface IProps {
  columns: ITableColumn[]
  data?: Record<string, string>[]
}

const Table = ({ columns, data }: IProps) => {

  return (
    <div className=''>
      <div className={`grid grid-cols-${addColumnsSize(columns.length)}`} >
        {columns.map(({ column }, idx) => {
          return (
            <p key={idx} className='text-lg font-medium'>{column}</p>
          )
        })}
      </div>
      {data?.map(row => <Row data={row} columns={columns} />)}
    </div>
  )
}

export default memo(Table)