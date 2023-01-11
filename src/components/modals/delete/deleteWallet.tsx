
import axios from 'axios';

import { useLocation } from 'react-router-dom';

import { MdOutlineDeleteOutline } from 'react-icons/md';

import { deleteToast } from '../../../helpers/toasts';
import { ToastBox } from '../../../helpers/toastContainer';

import '../delete/deleteWallet.css';

type props = {
  show: ( ) => void
  hide: ( ) => void
}

const DeleteModal = ( { hide } : props ) => {
  let id = useLocation( ).pathname;
  id = id.substring( 1 );

  const deleteWallets = async ( ) => {
    try {
      if ( id ) { 
        const res = await axios.delete( `http://localhost:3004/users/${ id }` );
          if ( res.status === 200 ) {
            deleteToast( );
            setTimeout( ( ) => hide( ) , 3000 );
          }
        }
      } catch ( e ) {
        alert( e );
    }
  };

  return (
    <>
      <div className='container'>
        <button onClick={ hide } > x </button>
        <div className='delete'>
          <MdOutlineDeleteOutline />
          <strong> Excluir Carteira </strong>
          <b> Tem certeza que deseja excluir essa Carteira? </b>
          <b> Esta ação não poderá ser desfeita. </b>
          <div>
            <button onClick={ deleteWallets } > Excluir </button>
            <button onClick={ hide } > Cancelar </button>
          </div>
        </div>
      </div>
      <ToastBox />
    </>
  );
}

export default DeleteModal;