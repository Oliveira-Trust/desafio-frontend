
import axios from 'axios';

import { FormEvent, useState, useRef, useCallback, useEffect } from 'react';

import { useWallet } from '../../../hook/useWallet';

import MaskedInput from '../../masks/maskedInput';

import { AiOutlineClose } from "react-icons/ai";

import { successToast, warningToast, errorToast } from '../../../helpers/toasts';
import { ToastBox } from '../../../helpers/toastContainer';

import 'react-toastify/dist/ReactToastify.css';

import '../create/createWallet.css';
import '../create/medias.css';
import '../../../toasts.css';

type props = {
  show: ( ) => void
  hide: ( ) => void
}

const CreateModal = ( { hide } : props ) => {
  const { data, realToBtc } = useWallet( );

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

  const handleNumber = useCallback(
    ( e: any ) => {
      let calc = realToBtc( 0.0000095, e.target.value )
      setValorCarteira( calc )
    },
    
    [ valorCarteira ]
  );

  useEffect(( ) => {
  }, [ handleNumber ]);

return (
  <>
    <div className='container'>
    <button onClick={ hide } > <AiOutlineClose /> </button>
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
           onChange={ handleNumber }
          />

          <strong> BTC { ( valorCarteira || 0 ) } </strong>

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