
import { useEffect, useState } from 'react';

import api from '../../../connect/axios';

import { useLocation } from 'react-router-dom';

import '../create/addWallet.css';
import { useWallet } from '../../../hook/useWallet';

type props = {
  fn: any
  id?: number
  nome?: string
  sobrenome?: string
  email?: string
  endereço?: string
  data_nascimento?: string
  data_abertura?: string
  valor_carteira?: number
  endereco_carteira?: string
}

const UpdateModal = ( { fn }: props ) => {
  let userId = useLocation( ).pathname;
  let id = userId;
  id = id.substring( 1 );

  const { getDataByUserId, dataById } = useWallet( );

  useEffect( ( ) => {
    getDataByUserId( id );
  }, [ ] );

  return (
      <div className='container'>
        <button onClick={ fn } > x </button>
        <div>
          <b> Editar Carteira </b>
          <form>
            <input placeholder={ dataById?.nome } />
            <input placeholder={ dataById?.sobrenome } />
            <input placeholder={ dataById?.email } />
            <input placeholder={ `${ dataById?.valor_carteira }` } />
            <strong> BTC { dataById?.valor_carteira } </strong>
            <div>
              <button onClick={ fn } > Cancelar </button>
              <button> Adicionar </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

export default UpdateModal;