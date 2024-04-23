import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { setModalDelete } from "../../redux/modalSlice";

import { Button, Modal } from 'react-bootstrap';

import { fetchDeleteWallet } from '../../services/api';

const ModalDelete = () => {
  const dispatch = useDispatch();

  const show = useSelector(state => state.modal.modalDelete.opened);
  const idWallet = useSelector(state => state.modal.modalDelete.id);
  
  const handleDelete = () => {
    fetchDeleteWallet(idWallet);
    handleClose();

  }
  const handleClose = () => dispatch(setModalDelete(false));
  
    return (
      <>
        <Modal centered show={show} onHide={handleClose}>
          <Modal.Body>

            <h3>
              Excluir Carteira
            </h3>
            <p>
              Tem certeza que deseja excluir essa Carteira?
              Esta ação não poderá ser desfeita.
            </p>

            <Button onClick={handleDelete} variant="danger">
              Excluir
            </Button>

            <Button variant="light bg-white" onClick={handleClose}>
              cancelar
            </Button>

          </Modal.Body>
        </Modal>
      </>
    );
}

export default ModalDelete;