import React from 'react'
import logo from '../../assets/imgs/logo.png'
import avatarImg from '../../assets/imgs/avatar.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = () => {
	return (
		<div className='flex self-stretch justify-center bg-white'>
			<div className='flex flex-row container justify-between'>
				<div className='w-52'>
					<a href='#'>
						<img
							src={logo}
							alt='Logo'
						/>
					</a>
				</div>
				<div className='flex items-center'>
					<div className='flex items-center p-1'>
						<div className='w-[50px] rounded-full border overflow-hidden'>
							<img
								src={avatarImg}
								alt='avatar'
							/>
						</div>
						<p className='font-sans ml-2 font-semibold'>
							German Cano
						</p>
					</div>
					<div>
						<button className='rounded-full w-7 h-7 trasition delay-100  hover:bg-zinc-50 '>
							<FontAwesomeIcon
								icon={['fas', 'arrow-right-from-bracket']}
								className=' stroke-red-700'
							/>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Header
