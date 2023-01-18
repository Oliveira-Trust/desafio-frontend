
import { Link } from 'react-router-dom';

import Pagination from '../pagination/pagination';

import { useModal } from '../../hook/useModal';
import { useWallet } from '../../hook/useWallet';

import { BiPencil } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';

import CreateModal from '../modals/create/createWallet';
import UpdateModal from '../modals/update/updateWallet';
import DeleteModal from '../modals/delete/deleteWallet';

import { users } from '../../model/users';

import '../wallets/wallets.css';

const Wallets = ( ) => {
  const { data, currentWallets, walletsPerPage, paginate } = useWallet( );
  const { openUpdateModal, openDeleteModal, openCreateModal,
          createModal, updateModal, deleteModal } = useModal( );

return (
  <section>
    { openCreateModal && <CreateModal show={ createModal } hide={ createModal } /> }
    { openUpdateModal && <UpdateModal show={ updateModal } hide={ updateModal } /> }
    { openDeleteModal && <DeleteModal show={ deleteModal } hide={ deleteModal } /> }
    
    <div>
      <b> BTC Carteiras </b>
      <button onClick={ createModal } > Adicionar Carteira </button>
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

      { currentWallets.map( ( user: users ) => {
        return (
          <div className='users' key={ user.id } >
            <label> { user.nome } </label>
            <label> { user.sobrenome } </label>
            <label> { user.email } </label>
            <label> { parseFloat( `${ user.valor_carteira }` ) } </label>
            <div>
              <Link to={ `${ user.id }` } onClick={ deleteModal } > <MdDeleteOutline /> </Link>
              <Link to={ `${ user.id }` } onClick={ updateModal } > <BiPencil /> </Link>
            </div>
          </div>
        );
      })}
    </div>
    
    <Pagination walletsPerPage={ walletsPerPage } totalWallets={ data.length } paginate={ paginate } />
  </section>
  );
}

export default Wallets;