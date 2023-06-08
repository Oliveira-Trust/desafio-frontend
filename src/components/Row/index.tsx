import React, { memo } from 'react'
import { GenericObject, ITableColumn } from '../../types/utils'
import { addColumnsSize} from '../../utils/utils'

interface IProps {
    data: GenericObject
    columns: ITableColumn[]
    actions?: JSX.Element[]
}

const Row = ({ data, columns, actions }: IProps) => {

    return (
        <div style={addColumnsSize(columns.length)}className={`grid p-4 odd:bg-zinc-100 hover:bg-zinc-50 hover:border-l-2 hover:border-blue-400`} >
            {columns.map(({ key }, idx) => {
                return (
                    <div key={idx} className=''>
                        <p className='text-base font-normal'>
                            {data[key]}
                        </p>
                    </div>
                )
            })}
            {actions &&
                <div className='place-self-end flex justify-center'>
                    {actions}
                </div>
            }
        </div>
    )
}

export default memo(Row)