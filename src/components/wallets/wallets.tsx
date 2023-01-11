

import { Link } from 'react-router-dom';

import { useModal } from '../../hook/useModal';
import { useWallet } from '../../hook/useWallet';

import AddWallet from '../modals/create/addWallet';
import UpdateModal from '../modals/update/updateWallet';

import { BiPencil } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';

import '../wallets/wallets.css';
import DeleteModal from '../modals/delete/deleteWallet';
import { useEffect } from 'react';
import axios from 'axios';

type props = {
  map: ( ) => void
  users: {}
  id: number
  nome: string
  sobrenome: string
  email: string
  endereço: string
  data_nascimento: string
  data_abertura: string
  valor_carteira: number
  endereco_carteira: string
}

const Wallets = ( ) => {
  const { data } = useWallet( );
  const { openUpdateModal, openDeleteModal, openCreateModal,
          showCreateModal, showUpdateModal, showDeleteModal } = useModal( );

return (
  <section>
    { openCreateModal && <AddWallet   show={ showCreateModal } hide={ showCreateModal } /> }
    { openUpdateModal && <UpdateModal show={ showUpdateModal } hide={ showUpdateModal } /> }
    { openDeleteModal && <DeleteModal show={ showDeleteModal } hide={ showDeleteModal } /> }
    
    <div>
      <b> BTC Carteiras </b>
      <button onClick={ showCreateModal } > Adicionar Carteira </button>
    </div>

    <div className='wallets'>
      <b> Carteiras </b>
      <button> Exportar CSV </button>

      <div className='infos'>
        <label> Nome </label>
        <label> Sobrenome </label>
        <label> Email </label>
        <label> Bitcoin </label>
      </div>

      { data.map( ( user: props ) => {
        return (
          <div className='users' key={ user.id } >
            <label> { user.nome } </label>
            <label> { user.sobrenome } </label>
            <label> { user.email } </label>
            <label> { parseFloat( `${ user.valor_carteira }` ) } </label>
            <div>
              <Link to={ `${ user.id }` } onClick={ showDeleteModal } > <MdDeleteOutline /> </Link>
              <Link to={ `${ user.id }` } onClick={ showUpdateModal } > <BiPencil /> </Link>
            </div>
          </div>
        )
      })}
    </div>
  </section>
  );
}

export default Wallets;