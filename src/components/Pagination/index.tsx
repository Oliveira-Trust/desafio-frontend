import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { memo, useEffect, useState } from 'react'

interface IProps {
    currentPage?: number
    total?: number
    limit: number
    callback: (pageNumber: number) => void
}

const Pagination = ({ currentPage = 0, total = 0, limit, callback }: IProps) => {
    const [pages, setPages] = useState<JSX.Element[]>([])

    const maxPages = 5
    const totalPages = Math.ceil(total / limit)


    useEffect(() => {
        insertPages()
    }, [currentPage,total])

    const getPagesCut = () => {
        const ceiling = Math.ceil(maxPages / 2)
        const floor = Math.floor(maxPages / 2)

        if (maxPages > totalPages) {
            return { firstIdx: 1, lastIdx: totalPages }
        } else if (currentPage >= 1 && currentPage <= ceiling) {
            return { firstIdx: 1, lastIdx: maxPages }
        } else if (currentPage + floor >= totalPages) {
            return { firstIdx: totalPages - maxPages + 1, lastIdx: totalPages }
        } else {
            return { firstIdx: currentPage - ceiling + 1, lastIdx: currentPage + floor }
        }
    }

    const insertPages = () => {
        const aux = []
        const pagesCut = getPagesCut()

        for (let i = pagesCut.firstIdx; i <= pagesCut.lastIdx; i++) {
            let isSelected = i === currentPage ? 'btn-blue hover:bg-blue-500' : 'hover:bg-zinc-100'
            aux.push(
                <li key={i}>
                    <button onClick={(e) => handleClick(i)} type='button' className={`border rounded-md w-7 h-7 ${isSelected}`}>
                        {i}
                    </button>
                </li>
            )
        }
        setPages(aux)

    }

    const handleClick = (pageNumber: number) => {
        if (pageNumber > totalPages || pageNumber < 1) return
        callback(pageNumber)
    }

    return (
        <div className='flex '>
            <ul className='inline-flex items-center gap-1'>
                <li>
                    <button onClick={(e) => handleClick(currentPage - 1)} type='button' className={` disabled:cursor-auto`}>
                        <FontAwesomeIcon icon={["fas", "angle-left"]} className="text-sm" />
                    </button>
                </li>
                {pages}
                <li>
                    <button onClick={(e) => handleClick(currentPage + 1)} type='button' className={` disabled:cursor-auto`}>
                        <FontAwesomeIcon icon={["fas", "angle-right"]} className="text-sm" />
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default memo(Pagination)
