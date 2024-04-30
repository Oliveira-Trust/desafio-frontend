import { useEffect, useState } from "react";
import { FormDeleteWallet } from "../FormDeleteWallet/FormDeleteWallet";
import { FormEditWallet } from "../FormEditWallet/FormEditWallet";

import styles from "./Wallet.module.css";
import { useWalletContext } from "../../../../contex/walletContext.tsx";
import WalletExport from "../WalletExport/WalletExport.tsx";

import Users from "../../../../services/users.tsx";

export function Wallet({ searchResults }: any) {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedId, setSelectedId] = useState("");
  const [matchingUsers, setMatchingUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const { listWallet } = useWalletContext();

  const handleEditButtonClick = (user: object) => {
    setSelectedUser(user);

    setOpenModalEdit(true);
  };

  const handleDeleteButtonClick = (id: string) => {
    setSelectedId(id);
    setOpenModalDelete(true);
  };

  useEffect(() => {
    Users.listar()
      .then((apiResponse) => {
        const foundUsers = apiResponse.data.filter(
          (user: any) =>
            user.nome === searchResults.nome ||
            user.sobrenome === searchResults.sobrenome ||
            user.email === searchResults.email
        );
        if (foundUsers.length <= 0) {
          setMatchingUsers(apiResponse.data);
        } else {
          setMatchingUsers(foundUsers);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchResults]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = matchingUsers.length > 0 ? matchingUsers : listWallet;
  const currentUsersToDisplay = currentUsers.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className={styles.containerWallet}>
      <div className={styles.walletHeader}>
        <span className={styles.walletTextHeader}>Carteiras</span>
        <WalletExport />
      </div>

      <table className={styles.tableWallet}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Email</th>
            <th>Bitcoin</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentUsersToDisplay.length > 0
            ? currentUsersToDisplay.map((user: any, index: number) => (
                <tr key={index}>
                  <td>{user.nome}</td>
                  <td>{user.sobrenome}</td>
                  <td>{user.email}</td>
                  <td>{user.valor_carteira}</td>
                  <td className={styles.tableButton}>
                    <button
                      onClick={() => {
                        handleEditButtonClick(user);
                      }}
                      className={`${styles.buttonPencil} `}
                    >
                      <i className={`${styles.pencil} pi pi-pencil`}></i>
                    </button>

                    <button
                      onClick={() => handleDeleteButtonClick(user.id)}
                      className={`${styles.buttonTrash} `}
                    >
                      <i className={`${styles.trash} pi pi-trash`}></i>
                    </button>
                  </td>
                </tr>
              ))
            : listWallet.map((user: any, index: number) => (
                <tr key={index}>
                  <td>{user.nome}</td>
                  <td>{user.sobrenome}</td>
                  <td>{user.email}</td>
                  <td>{user.valor_carteira}</td>
                  <td className={styles.tableButton}>
                    <button
                      onClick={() => {
                        handleEditButtonClick(user);
                      }}
                      className={`${styles.buttonPencil} `}
                    >
                      <i className={`${styles.pencil} pi pi-pencil`}></i>
                    </button>

                    <button
                      onClick={() => handleDeleteButtonClick(user.id)}
                      className={`${styles.buttonTrash} `}
                    >
                      <i className={`${styles.trash} pi pi-trash`}></i>
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <span className={styles.register}>
          {matchingUsers.length > 0 ? matchingUsers.length : listWallet.length}{" "}
          registro(s)
        </span>
        <div>
          <button
            className={`pi pi-angle-left`}
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          ></button>
          <span>{currentPage}</span>
          <button
            className={`pi pi-angle-right`}
            onClick={() => paginate(currentPage + 1)}
            disabled={currentUsers.length <= indexOfLastUser}
          ></button>
        </div>
      </div>

      {selectedUser && (
        <FormEditWallet
          user={selectedUser}
          openModalEdit={openModalEdit}
          setOpenModalEdit={setOpenModalEdit}
          key={selectedUser ? selectedUser.id : undefined}
        />
      )}

      <FormDeleteWallet
        id={selectedId}
        openModalDelete={openModalDelete}
        setOpenModalDelete={setOpenModalDelete}
      />
    </div>
  );
}
