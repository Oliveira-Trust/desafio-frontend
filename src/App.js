import 'bootstrap/dist/css/bootstrap.min.css';

import ModalWallet from './components/ModalWallet';
import ModalDelete from './components/ModalDelete';

import Header from './components/Header';
import Wallet from './components/Wallet';
import Filter from './components/Filter';
import Result from './components/Result';
import Footer from './components/Footer';

function App() {

  return (
    <>
      {/* modais de gestão da informação */}
      <ModalWallet />
      <ModalDelete />
      
      {/* header da aplicação */}
      <Header />

      {/* header da sessão */}
      <Wallet />

      {/* filtro independente alimentado por estado global */}
      <Filter />

      {/* display de resultados encontrados na API */}
      <Result />

      {/* footer da applicação */}
      <Footer />      
    </>
  );
}

export default App;
