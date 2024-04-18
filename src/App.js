import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Wallet from './components/Wallet';
import Filter from './components/Filter';
import Result from './components/Result';

function App() {
  return (
    <>
      <Header />
      <Wallet />
      <Filter />
      <Result />

      <div>
        Fintools | Desafio Front-end
      </div>
    </>
  );
}

export default App;
