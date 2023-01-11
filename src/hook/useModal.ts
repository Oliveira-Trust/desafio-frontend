import { useState } from 'react';

export const useModal = ( ) => {
  const [ openCreateModal, setCreateModal ] = useState < boolean > ( false );
  const [ openUpdateModal, setUpdateModal ] = useState < boolean > ( false );
  const [ openDeleteModal, setDeleteModal ] = useState < boolean > ( false );

  const showCreateModal = ( ) => {
    setCreateModal( prevState => !prevState );
  }

  const showUpdateModal = ( ) => {
    setUpdateModal( prevState => !prevState );
  }

  const showDeleteModal = ( ) => {
    setDeleteModal( prevState => !prevState );
  }

  return {
    showCreateModal,
      showUpdateModal,
        showDeleteModal,
          openCreateModal,
            openUpdateModal,
              openDeleteModal
  }
}