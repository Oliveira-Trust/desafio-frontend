
import { useState } from 'react';
import { useWallet } from './useWallet';

export const useModal = ( ) => {
  const [ openCreateModal, setCreateModal ] = useState < boolean > ( false );
  const [ openUpdateModal, setUpdateModal ] = useState < boolean > ( false );
  const [ openDeleteModal, setDeleteModal ] = useState < boolean > ( false );

  const createModal = ( ) => {
    setCreateModal( prevState => !prevState );
  }

  const updateModal = ( ) => {
    setUpdateModal( prevState => !prevState );
  }

  const deleteModal = ( ) => {
    setDeleteModal( prevState => !prevState );
  }

  return {
    createModal,
      updateModal,
        deleteModal,
          openCreateModal,
            openUpdateModal,
              openDeleteModal
  }
}