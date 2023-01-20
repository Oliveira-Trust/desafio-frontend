
import { AiOutlineClose } from "react-icons/ai";

import '../search/searchModal.css';
import '../search/medias.css';

type props = {
  user: any
  hide: ( ) => void
}

const SearchModal = ( { hide, user } : props ) => {
  return (
    <>
      <div className='searchModalContainer'>
      <button onClick={ hide } > <AiOutlineClose /> </button>
        <div className='users' key={ user.id } >
          <span> <strong> Nome </strong> { user.nome } </span>
          <span> <strong> Sobrenome </strong>  { user.sobrenome } </span>
          <span> <strong> Email </strong>  { user.email } </span>
          <span> <strong> Bitcoin </strong> { user.valor_carteira.toString( ) } </span>
        </div>
      </div>
    </>
  );
}

export default SearchModal;