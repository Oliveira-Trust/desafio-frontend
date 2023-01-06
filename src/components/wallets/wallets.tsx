
import { BiPencil } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';

import data from '../../api/data.json';

import '../wallets/wallets.css';


const Wallets = ( ) => {
  return (
    <section>
      <div>
        <b> BTC Carteiras </b>
        <button> Adicionar Carteira </button>
      </div>

      <div className='wallets'>
        <b> Carteiras </b>
        <button> Exportar CSV </button>

        <div className='infos'>
          <label> Nome </label>
          <label> Sobrenome </label>
          <label> Email </label>
          <label> Bitcoin </label>
        </div>

        { data.users.map (user => {
          return (
            <div className='users'>
              <label> { user.nome } </label>
              <label> { user.sobrenome } </label>
              <label> { user.email } </label>
              <label> { user.valor_carteira } </label>
              <div>
                <button> <BiPencil /> </button>
                <button> <MdDeleteOutline /> </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
    );
  }

export default Wallets;