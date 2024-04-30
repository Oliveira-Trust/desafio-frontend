import { Modal } from "../../../../components/Modal/Modal";
import { useWalletContext } from "../../../../contex/walletContext";
import { ModalDeleteProps } from "../../../../types/modal";

import styles from "./FormDeleteWallet.module.css";

export function FormDeleteWallet({
  id,
  openModalDelete,
  setOpenModalDelete,
}: ModalDeleteProps) {
  const { deleteUser } = useWalletContext();

  return (
    <Modal
      isOpen={openModalDelete}
      setOpenModal={() => {
        setOpenModalDelete(!setOpenModalDelete);
      }}
    >
      <form className={styles.formValidation}>
        <div className={styles.formDescriptions}>
          <span className={`${styles.formTrash} pi pi-trash`}></span>
          <span className={styles.formDescriptionOne}>Excluir Carteira</span>
          <span className={styles.formDescriptionTwo}>
            Tem certeza que deseja excluir essa Carteira?
          </span>
          <span className={styles.formDescriptionThree}>
            Está ação não poderá ser desfeita
          </span>
        </div>
        <div className={styles.buttonFinishDelete}>
          <button
            className={styles.buttonDelete}
            onClick={() => {
              deleteUser(id);
            }}
          >
            Excluir
          </button>
          <button className={styles.buttonToCancel}>Cancelar</button>
        </div>
      </form>
    </Modal>
  );
}
