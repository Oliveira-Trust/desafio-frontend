import React from 'react'

interface IProps {
	className: string
	message: string
}

const Toast = ({ className, message }: IProps) => {
	return (
		<div className={`${className} m-t2`}>
			<p>{message}</p>
		</div>
	)
}

export default Toast
