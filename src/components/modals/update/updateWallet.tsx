
import axios from 'axios';

import { useEffect, useState, FormEvent, useRef, useCallback } from 'react';

import { useLocation } from 'react-router-dom';

import { useWallet } from '../../../hook/useWallet';

import MaskedInput from '../../masks/maskedInput';

import { AiOutlineClose } from "react-icons/ai";

import { errorToast, successToast, warningToast } from '../../../helpers/toasts';
import { ToastBox } from '../../../helpers/toastContainer';

import '../create/createWallet.css';
import '../create/medias.css';

type props = {
  show: () => void
  hide: () => void
}

const UpdateModal = ( { show, hide }: props ) => {
  let userId = useLocation( ).pathname;
  let id = userId;
  id = id.substring( 1 );
  
  const { dataById, getDataByUserId, currency, realToBtc, btcToReal } = useWallet( );
  
  const nome = useRef<HTMLInputElement> ( null );
  const sobrenome = useRef<HTMLInputElement> ( null );
  const email = useRef<HTMLInputElement> ( null );
  const [ valorCarteira, setValorCarteira ] = useState< any > ( );

  const updateWallet = async ( e: FormEvent ) => {
    e.preventDefault( );
    
    const obj: any = { 
      nome: nome.current?.value, 
      sobrenome : sobrenome.current?.value, 
      email: email.current?.value, 
      valor_carteira: valorCarteira
    };

    let objectCount = 0;
    for ( let props in obj ) { if ( obj[ props ] ) { objectCount++ } };
    if( objectCount <= 3 ) { return warningToast( ) };

    if( id ) {
      try {
        const res = await axios.put( `http://localhost:3004/users/${ id }`, obj );
        console.log( res.status );

        if( res.status === 200 ) {
          successToast( ' Carteira atualizada com sucesso ' );
          setTimeout( ( ) => hide( ), 3000 );
        } else {
          errorToast( ' Error... ' );
        }
      } catch ( e ) {
        const typedError = e as Error;
        return typedError;
      }
    }
  }

  const handleNumber = useCallback(
    ( e: any ) => {
      let calc: any = realToBtc( 0.0000095, e.target.value )
      setValorCarteira( calc );
    },
    [ valorCarteira ]
  );

  useEffect( ( ) => {
    getDataByUserId( id );
  }, [ handleNumber ] );
  
  return (
  <>
    <div className='container'>
      <button onClick={ hide } > <AiOutlineClose /> </button>
      <div>
        <b> Editar Carteira </b>
        <form onSubmit={ updateWallet } >
          <input ref={ nome } type='text'  placeholder={ dataById?.nome } />
          <input ref={ sobrenome } type='text' placeholder={ dataById?.sobrenome } />
          <input ref={ email } type='email' placeholder={ dataById?.email }  />
          <MaskedInput
           name="price"
           mask="currency"
           onChange={ handleNumber }
          />
          <strong> BTC { ( valorCarteira || 0 ) } </strong> 
          <div>
            <button onClick={ hide } > Cancelar </button>
            <button> Adicionar </button>
          </div>
        </form>
      </div>
    </div>
    <ToastBox />
  </>
     
    );
  }

export default UpdateModal;