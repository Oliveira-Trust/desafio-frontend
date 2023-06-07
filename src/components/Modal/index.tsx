import { wrap } from 'module'
import React, { useEffect, useRef, useState } from 'react'
import { Node } from 'typescript'

interface IProps {
  title?: string
  show?: boolean
  children?: JSX.Element
  onHide: () => void
}

const Modal = ({
  title,
  show,
  children,
  onHide
}: IProps) => {
  if (!show) return null
  return (
    <div className='fixed inset-0  flex justify-center items-center'>
      <div onClick={onHide} className='fixed inset-0 bg-black bg-opacity-90  z-0' />
      <div className='bg-white rounded flex flex-col p-5 w-[600px] z-20'>
        {
          title &&
          <div className='flex flex-col grow'>
            <p className='text-xl font-bold'>
              {title}
            </p>
            <hr className='my-4 h-0.5 border-t-0 bg-neutral-100 opacity-100' />
          </div>
        }
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal