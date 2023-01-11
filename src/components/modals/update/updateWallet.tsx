
import api from '../../../connect/axios';

import { useEffect, useState, FormEvent } from 'react';

import { useWallet } from '../../../hook/useWallet';

import { useLocation } from 'react-router-dom';

import '../create/addWallet.css';
import { errorToast, successToast, warningToast } from '../../../helpers/toasts';
import axios from 'axios';
import { ToastBox } from '../../../helpers/toastContainer';

type props = {
  show: () => void
  hide: () => void
}

const UpdateModal = ( { show, hide }: props ) => {
  let userId = useLocation( ).pathname;
  let id = userId;
  id = id.substring( 1 );

  const { getDataByUserId, dataById, data } = useWallet( );

  const [ nome, setNome ] = useState <string> ( '' );
  const [ sobrenome, setSobreNome ] = useState <string> ( '' );
  const [ email, setEmail ] = useState <string> ( '' );
  const [ valor_carteira, setValorCarteira ] = useState <any> ( );

  useEffect( ( ) => {
    getDataByUserId( id );
  }, [ ] );

  const updateWallet = async ( e: FormEvent ) => {
    e.preventDefault( );

    const object: any = { nome, sobrenome, email, valor_carteira };

    let objectCount = 0;
    for ( let props in object ) { if ( object[ props ] ) { objectCount++ } };
    if( objectCount <= 3 ) { return warningToast( ) };

    if( id ) {
      try {
        const find_email_in_db = data.find( ( data ) => data.email === object.email );
        if( find_email_in_db ) { return errorToast( ' Esse é seu E-mail atual. ' ) };
  
        const res = await axios.put( `http://localhost:3004/users/${ id }`, object );
        console.log( res.status );

        if( res.status === 200 ) {
          successToast( ' Carteira atualizada com sucesso ' );
          setNome( '' ); setSobreNome( '' ); setEmail( '' ); setValorCarteira( '' );
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

  const handleNumber = ( e: FormEvent ) => {
    let input = (e.target as HTMLInputElement).value;
      if( input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/) ) {
        setValorCarteira( input );
      }
  }

  const handleFloat = ( ) => {
    setValorCarteira( parseFloat( valor_carteira ) || '' );
  }

 

  return (
  <>
    <div className='container'>
      <button onClick={ hide } > x </button>
      <div>
        <b> Editar Carteira </b>
        <form onSubmit={ updateWallet } >
          <input type='text' placeholder={ dataById?.nome } onChange= { ( e ) => setNome( e.target.value ) } />
          <input type='text' placeholder={ dataById?.sobrenome } onChange={ ( e ) => setSobreNome( e.target.value ) } />
          <input type='email' placeholder={ dataById?.email } onChange={ ( e ) => setEmail( e.target.value ) } />
          <input 
            type='number' 
            placeholder={ `R$: ${ dataById?.valor_carteira }` } 
            value={ valor_carteira }
            onChange={ handleNumber }
            onBlur={ handleFloat } 
          />
          <strong> BTC { dataById?.valor_carteira } </strong>
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