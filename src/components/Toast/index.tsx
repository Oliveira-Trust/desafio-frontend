import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
