
import axios from 'axios';

import { FormEvent, useState, useRef, useCallback, useEffect } from 'react';

import { useWallet } from '../../../hook/useWallet';

import MaskedInput from '../../masks/maskedInput';

import { successToast, warningToast, errorToast } from '../../../helpers/toasts';
import { ToastBox } from '../../../helpers/toastContainer';

import 'react-toastify/dist/ReactToastify.css';

import '../create/createWallet.css';
import '../../../../src/toasts.css';

type props = {
  show: ( ) => void
  hide: ( ) => void
}

interface currencys {
  price: any ;
}

const CreateModal = ( { hide } : props ) => {
  const { data, realToBtc, quotation } = useWallet( );

  const nome = useRef<HTMLInputElement> ( null );
  const sobrenome = useRef<HTMLInputElement> ( null );
  const email = useRef<HTMLInputElement> ( null );
  const [ valorCarteira, setValorCarteira ] = useState<any> ( );

  const createWalletsSubmit = async ( e: FormEvent ) => {
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

    try {
      const find_email_in_db = data.find( ( data ) => data.email === obj.email );
      if( find_email_in_db ) { return errorToast( ' Email em uso. ' ) };

      const res = await axios.post( 'http://localhost:3004/users', obj );

      if( res.status === 201 ) {
        successToast( ' Carteira adicionada com sucesso ' );
        setTimeout( ( ) => hide( ), 3000 );
      } else {
        errorToast( ' Error... ' );
      }
    } catch ( e ) {
        const typedError = e as Error;
        return typedError;
    }
  }

  const handleChange = useCallback(
    ( e: any ) => {
      setValorCarteira( e.target.value );
    },
    
    [ valorCarteira ]
  );


  useEffect(( ) => {
  }, [ handleChange ]);

  // setValorCarteira({
  //   ...valorCarteira,
  //   [e.target.name]: e.target.value,
  // });

  // const handleFloat = ( ) => {
  // realToBtc( 0.000011, valorCarteira?.price )
  //   setValorCarteira( valorCarteira.price );
  //   return;
  // }

return (
  <>
    <div className='container'>
    <button onClick={ hide } > x </button>
      <div>
        <b> Adicionar Carteira </b>
        <form onSubmit={ createWalletsSubmit } >
          <input ref={ nome }  placeholder=' Nome' type='text' />
          <input ref={ sobrenome } placeholder=' Sobrenome' type='text' />
          <input ref={ email } placeholder=' Email' type='email' />
          <MaskedInput
           name="price"
           mask="currency"
           placeholder="0,01"
           onChange={ handleChange }
          />

          <strong> BTC { realToBtc( 0.0000095, ( valorCarteira || 0 ) ) } </strong>

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

export default CreateModal;