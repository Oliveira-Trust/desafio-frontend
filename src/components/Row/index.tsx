import React, { memo } from 'react'
import { ITableColumn } from '../../types/utils'
import { addColumnsSize } from '../../utils/utils'

interface IProps {
    data: Record<string, string>
    columns: ITableColumn[]
}

const Row = ({ data, columns }: IProps) => {

    return (
        <div className={`grid grid-cols-${addColumnsSize(columns.length)}`} >
            {columns.map(({ key }, idx) => {
                return(
                    <div key={idx}>
                        <p className='text-lg font-medium'>
                            {data[key]}
                        </p>
                    </div>
                )
            })}
        </div>
    )
}

export default memo(Row)