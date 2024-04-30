import { useState } from "react";
import styles from "./Home.module.css";
import { FormAddWallet } from "./components/FormAddWallet/FormAddWallet";
import { SearchWallet } from "./components/SearchWallet/SearchWallet";
import { Wallet } from "./components/Wallet/Wallet";

export function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.home}>
        <h1>BTC Carteiras</h1>
        <button
          className={styles.buttonModal}
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Adicionar Carteira
        </button>
      </div>
      <FormAddWallet openModal={openModal} setOpenModal={setOpenModal} />
      <SearchWallet setSearchResults={setSearchResults} />
      <Wallet searchResults={searchResults} />
    </div>
  );
}
