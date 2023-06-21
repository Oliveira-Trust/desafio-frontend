import React from 'react'

const Loading = () => {
	return (
		<div className='absolute inset-0  bg-white z-10 flex justify-center items-center'>
			<div
				className='inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
				role='status'>
				<span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
					Loading...
				</span>
			</div>
		</div>
	)
}

export default Loading
