import { useState } from 'react';

export const useModal = ( ) => {
  const [ openCreateWalletModal, setCreateWalletModal ] = useState < boolean > ( false );
  const [ openUpdateModal, setUpdateModal ] = useState < boolean > ( false );
  const [ openDeleteModal, setDeleteModal ] = useState < boolean > ( false );

  const createWallet = ( ) => {
    setCreateWalletModal( prevState => !prevState );
  }

  const updateWallet = ( ) => {
    setUpdateModal( prevState => !prevState );
  }

  const deleteWallet = ( ) => {
    setDeleteModal( prevState => !prevState );
  }

  return {
    createWallet,
      updateWallet,
        deleteWallet,
          openUpdateModal,
            openDeleteModal,
              openCreateWalletModal,
  }
}