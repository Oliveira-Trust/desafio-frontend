import React, { memo } from 'react'
import { ITableColumn } from '../../types/utils'
import { addColumnsSize } from '../../utils/utils'

interface IProps {
    data: Record<string, number | string>
    columns: ITableColumn[]
}

const Row = ({ data, columns }: IProps) => {

    return (
        <div className={`grid ${addColumnsSize(columns.length)} p-4 odd:bg-zinc-100 hover:bg-zinc-50 hover:border-l-2 hover:border-blue-400`} >
            {columns.map(({ key }, idx) => {
                return (
                    <div key={idx} className=''>
                        <p className='text-base font-normal'>
                            {data[key]}
                        </p>
                    </div>
                )
            })}
        </div>
    )
}

export default memo(Row)