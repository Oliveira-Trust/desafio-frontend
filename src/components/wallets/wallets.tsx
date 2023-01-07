

import { Link } from 'react-router-dom';

import { useModal } from '../../hook/useModal';
import { useWallet } from '../../hook/useWallet';

import AddWallet from '../modals/create/addWallet';
import UpdateModal from '../modals/update/updateWallet';

import { BiPencil } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';

import '../wallets/wallets.css';


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
  const { openUpdateModal, openDeleteModal, openCreateWalletModal, 
          createWallet, updateWallet, deleteWallet } = useModal( );

  return (
      <section>
        { openCreateWalletModal && <AddWallet  fn={ createWallet } /> }
        { openUpdateModal && <UpdateModal fn={ updateWallet } /> }
        
        <div>
          <b> BTC Carteiras </b>
          <button onClick={ createWallet } > Adicionar Carteira </button>
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
                <label> { user.valor_carteira } </label>
                <div>
                  <Link to={ `${ user.id }` } onClick={ updateWallet } > <MdDeleteOutline /> </Link>
                  <Link to={ `${ user.id }` } onClick={ updateWallet } > <BiPencil /> </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    );
  }

export default Wallets;