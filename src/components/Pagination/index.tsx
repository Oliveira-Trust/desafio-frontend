import React, { memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface IProps {
	currentPage?: number
	total?: number
	limit: number
	callback: (pageNumber: number) => void
}

const Pagination = ({
	currentPage = 0,
	total = 0,
	limit,
	callback,
}: IProps) => {
	const maxPages = 5
	const totalPages = Math.ceil(total / limit)

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
			return {
				firstIdx: currentPage - ceiling + 1,
				lastIdx: currentPage + floor,
			}
		}
	}

	const handleClick = (pageNumber: number) => {
		if (pageNumber > totalPages || pageNumber < 1) return
		callback(pageNumber)
	}

	const insertPages = () => {
		const pages = []
		const pagesCut = getPagesCut()
		for (let i = pagesCut.firstIdx; i <= pagesCut.lastIdx; i++) {
			let isSelected = i === currentPage
			pages.push(
				<li key={i}>
					<button
						onClick={(e) => handleClick(i)}
						disabled={isSelected}
						type='button'
						className={`border rounded-md w-7 h-7 ${
							isSelected
								? 'btn-blue hover:bg-blue-700'
								: 'hover:bg-zinc-100'
						}`}>
						{i}
					</button>
				</li>
			)
		}

		if (pagesCut.lastIdx === 0 || !pagesCut.lastIdx) {
			pages.push(
				<li key={1}>
					<button
						type='button'
						className={`border rounded-md w-7 h-7 btn-blue hover:bg-blue-700`}
						disabled={true}>
						1
					</button>
				</li>
			)
		}
		return pages
	}

	return (
		<div className='flex '>
			<ul className='inline-flex items-center gap-1'>
				<li>
					<button
						onClick={(e) => handleClick(currentPage - 1)}
						disabled={currentPage - 1 <= 0}
						type='button'
						className={` disabled:cursor-auto disabled:text-gray-300`}>
						<FontAwesomeIcon
							icon={['fas', 'angle-left']}
							className='text-sm'
						/>
					</button>
				</li>
				{insertPages()}
				<li>
					<button
						onClick={(e) => handleClick(currentPage + 1)}
						disabled={currentPage + 1 > totalPages}
						type='button'
						className={` disabled:cursor-auto disabled:text-gray-300`}>
						<FontAwesomeIcon
							icon={['fas', 'angle-right']}
							className='text-sm'
						/>
					</button>
				</li>
			</ul>
		</div>
	)
}

export default memo(Pagination)
