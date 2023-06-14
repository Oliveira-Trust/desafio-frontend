import React, { memo } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GenericObject } from '../../types/utils'
interface IProps<T> {
	icon: IconProp
	tooltip?: string
	callback: (data: T) => void
	data: T
}
const Action = <T extends GenericObject>({
	icon,
	tooltip,
	callback,
	data,
}: IProps<T>) => {
	return (
		<div>
			<div className='group relative inline-block'>
				<button
					onClick={() => callback(data)}
					className='rounded-full w-7 h-7 trasition delay-100  hover:bg-zinc-200'>
					<FontAwesomeIcon icon={icon} />
				</button>
				<div className='mt-1 p-2 left-1/2 -translate-x-1/2 invisible opacity-0 group-hover:visible group-hover:opacity-70 bg-black text-white text-xs absolute rounded-md'>
					<span>{tooltip}</span>
					<span className='absolute inner-block border-[5px] left-1/2 -translate-x-1/2 bottom-full border-l-transparent border-r-transparent border-b-black border-t-0 '></span>
				</div>
			</div>
		</div>
	)
}

export default memo(Action)
