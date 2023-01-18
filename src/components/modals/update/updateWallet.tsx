
import axios from 'axios';

import { useEffect, useState, FormEvent, useRef, useCallback } from 'react';

import { useWallet } from '../../../hook/useWallet';

import { useLocation } from 'react-router-dom';

import { errorToast, successToast, warningToast } from '../../../helpers/toasts';
import { ToastBox } from '../../../helpers/toastContainer';

import '../create/createWallet.css';


type props = {
  show: () => void
  hide: () => void
}

const UpdateModal = ( { show, hide }: props ) => {
  let userId = useLocation( ).pathname;
  let id = userId;
  id = id.substring( 1 );
  
  const { data, dataById, getDataByUserId, currency, exchange } = useWallet( );
  
  const nome = useRef<HTMLInputElement> ( null );
  const sobrenome = useRef<HTMLInputElement> ( null );
  const email = useRef<HTMLInputElement> ( null );
  const [ valorCarteira, setValorCarteira ] = useState< any > ( null );

  useEffect( ( ) => {
    getDataByUserId( id );
  }, [ ] );

  currency( );

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
        const find_email_in_db = data.find( ( data ) => data.email === obj.email );
        if( find_email_in_db ) { return errorToast( ' Esse é seu E-mail atual. ' ) };
  
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

  const handleNumber = async ( e: FormEvent ) => {
    let input: any = (e.target as HTMLInputElement).value;
      if( input.match( /^([0-9]{1,})?(\.)?([0-9]{1,})?$/ ) ) {
        setValorCarteira( input );
        return input;
      }
  }

  const handleFloat = ( ) => {
    setValorCarteira( parseFloat( valorCarteira ) || '' );
    return;
  }

  return (
  <>
    <div className='container'>
      <button onClick={ hide } > x </button>
      <div>
        <b> Editar Carteira </b>
        <form onSubmit={ updateWallet } >
          <input ref={ nome } type='text'  placeholder={ dataById?.nome } />
          <input ref={ sobrenome } type='text' placeholder={ dataById?.sobrenome } />
          <input ref={email} type='email' placeholder={ dataById?.email }  />
          <input 
            type='number' 
            placeholder={ `R$: ${ exchange } ` }  
            value={ valorCarteira || '' }
            onChange={ handleNumber }
            onBlur={ handleFloat } 
          />
          <strong> BTC { valorCarteira } </strong>
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