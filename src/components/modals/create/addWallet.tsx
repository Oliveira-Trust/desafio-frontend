
import '../create/addWallet.css';
import { useModal } from '../../../hook/useModal';

const AddWallet = ( { fn } : any ) => {

  return (
      <div className='container'>
        <button onClick={ fn } > x </button>
        <div>
          <b> Adicionar Carteira </b>
          <form>
            <input placeholder=' Nome' />
            <input placeholder=' Sobrenome' />
            <input placeholder=' Email' />
            <input placeholder=' Valor De Compra' />
            <strong> BTC 0.12345 </strong>
            <div>
              <button onClick={ fn } > Cancelar </button>
              <button> Adicionar </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

export default AddWallet;