
import axios from 'axios';

import { FormEvent, useEffect, useState } from 'react';
import { useWallet } from '../../../hook/useWallet';

import { successToast, warningToast, errorToast } from '../../../helpers/toasts';
import 'react-toastify/dist/ReactToastify.css';

import '../create/addWallet.css';
import '../../../../src/toasts.css';
import { ToastBox } from '../../../helpers/toastContainer';

type props = {
  show: ( ) => void
  hide: ( ) => void
}

const AddWallet = ( { hide } : props ) => {
  const { data } = useWallet( );
  const [ nome, setNome ] = useState <string> ( '' );
  const [ sobrenome, setSobreNome ] = useState <string> ( '' );
  const [ email, setEmail ] = useState <string> ( '' );
  const [ valor_carteira, setValorCarteira ] = useState <any> ( );

  useEffect( ( ) => {
    covertBtcToReal( );
  }, [ ] );

  const covertBtcToReal = async () => {
      const res = await axios.get( 'http://economia.awesomeapi.com.br/json/last/BTC-BRL' );
      console.log( res.data )
  }
   
 
  const createWallet = async ( e: FormEvent ) => {
    e.preventDefault( );

    const post: any = { nome, sobrenome, email, valor_carteira };

    let objectCount = 0;
    for ( let props in post ) { if ( post[ props ] ) { objectCount++ } };
    if( objectCount <= 3 ) { return warningToast( ) };

    try {
      const find_email_in_db = data.find( ( data ) => data.email === post.email );
      if( find_email_in_db ) { return errorToast( ' Email em uso. ' ) };

      const res = await axios.post( 'http://localhost:3004/users', post );

      if( res.status === 201 ) {
        successToast( ' Carteira adicionada com sucesso ' );
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
          <b> Adicionar Carteira </b>
          <form onSubmit={ createWallet } >
            <input placeholder=' Nome' type='text' value={ nome } onChange={ ( e ) => setNome( e.target.value ) } />
            <input placeholder=' Sobrenome' type='text' value={ sobrenome } onChange={ ( e ) => setSobreNome( e.target.value ) } />
            <input placeholder=' Email' type='email' value={ email } onChange={ ( e ) => setEmail( e.target.value ) } />
            <input
              placeholder='Valor De Compra'
              type='number'
              value={ valor_carteira }
              onChange={ handleNumber }
              onBlur={ handleFloat } 
            />
            <strong> BTC 0.12345 </strong>
            <div>
              <button onClick={ hide } > Cancelar </button>
              <button type='submit'> Adicionar </button>
            </div>
          </form>
        </div>
      </div>

      <ToastBox />
    </>
    );
  }

export default AddWallet;