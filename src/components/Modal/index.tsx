import React, { useState } from 'react'

interface IProps {
  title?: string
  show?: boolean
  children?: JSX.Element
}

const Modal = ({
  title,
  show,
  children
}: IProps) => {

  const [enabled, setEnabled] = useState(show)

  const handleClose= () => {
    setEnabled(false)
  } 

  return (
    <>
      {enabled &&
        <div onClick={handleClose} className='fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center z-10'>
          <div className='bg-white rounded flex p-5 w-96'>
            {
              title &&
              <div className='flex flex-col grow'>
                <p className='text-lg font-bold'>
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
      }
    </>

  )
}

export default Modal