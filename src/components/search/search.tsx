
import { FormEvent, useRef, useState } from 'react';

import SearchModal from '../modals/search/searchModal';

import { useWallet } from '../../hook/useWallet';

import { errorToast, successToast } from '../../helpers/toasts';
import { ToastBox } from '../../helpers/toastContainer';

import { BiSearch } from 'react-icons/bi';

import { users } from '../../model/users';

import '../search/search.css';
import '../search/medias.css';

const Search = ( ) => {
  const { data } = useWallet( );

  const nomeRef = useRef< HTMLInputElement > ( null );
  const sobrenomeRef = useRef< HTMLInputElement > ( null );
  const emailRef = useRef< HTMLInputElement > ( null ); 

  const [ searched, setSearched ] = useState< { } > ( );
  const [ openSearchModal, setSearchModal ] = useState < boolean > ( false );

  const searchModal = ( ) => {
    setSearchModal( prev => !prev );
  }

  const searchWallet = async ( e: FormEvent ) => {
    e.preventDefault( );
    try {
      const value = {
        nome: nomeRef.current?.value.toLowerCase( ),
        sobrenome: sobrenomeRef.current?.value.toLowerCase( ),
        email: emailRef.current?.value.toLowerCase( )
      } 

      const find_user = data.find ( ( user: users ) => {
          let tolower = user.nome.toLowerCase();
          return tolower === value.nome;
        }
      );
        
      if( find_user ) {  
        successToast( ' Carteira encontrada com sucesso. ' );
        const wallet: Array< { } > = [ ];

        wallet.push( find_user );

        setSearched( find_user );
     
        if( openSearchModal == false ) {
          searchModal( );
        }   
      } else {
        return errorToast( 'Carteira não encontrada.' );
      }
    } catch ( e ) {
        const typedError = e as Error;
        return typedError;
    }
  }

return (  
  <>
    { openSearchModal && <SearchModal hide={ searchModal } user={ searched } /> }
    <div className='searchContainer' >
      <form>
        <input ref={ nomeRef } type='text' placeholder=' Nome' />
        <input ref={ sobrenomeRef } type='text' placeholder=' Sobrenome' />
        <input ref={ emailRef } type='email' required placeholder=' Email' />
        <button type='submit' onClick={ searchWallet } > <BiSearch /> <p> Buscar </p> </button>
      </form>
      <ToastBox />
    </div>
  </>
  );
};

export default Search;