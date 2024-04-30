import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "../../../../components/Modal/Modal";
import { useForm } from "react-hook-form";

import Users from "../../../../services/users.tsx";
import Modedas from "../services/moedas.tsx";

import styles from "./FormEditWallet.module.css";

import { ModalEditProps } from "../../../../types/modal";
import { useState } from "react";
import { useWalletContext } from "../../../../contex/walletContext";
import {
  ProfileSchema,
  profileSchema,
} from "../../../../validation/SchemaValidation.ts";

export function FormEditWallet({
  user,
  openModalEdit,
  setOpenModalEdit,
}: ModalEditProps) {
  const [btcValue, setBTCValue] = useState<number | null>(null);

  const { fetchUsers } = useWalletContext();

  const {
    reset,
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
  });

  function handleAddWallet(data: ProfileSchema) {
    listCoins(data.valor_carteira).then((valueBTC) => {
      const btcValueFormatted = parseFloat(valueBTC.toFixed(8));
      const id = user.id;
      const addWallet = { ...data, valor_carteira: btcValueFormatted };

      Users.atualizar(addWallet, id).then(() => {
        setOpenModalEdit(false);
        reset();
        setBTCValue(null);
        fetchUsers();
      });
    });
  }

  function listCoins(value: number) {
    return Modedas.listarMoeda().then((res) => {
      return value / res.data.BTCBRL.bid;
    });
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value)) {
      listCoins(value).then((valueBTC) => {
        setBTCValue(valueBTC);
      });
    } else {
      setBTCValue(null);
    }
  };

  return (
    <div className={styles.bodyModal}>
      <Modal
        isOpen={openModalEdit}
        setOpenModal={() => {
          setOpenModalEdit(!setOpenModalEdit);
        }}
      >
        <form
          onSubmit={handleSubmit(handleAddWallet)}
          className={styles.formValidation}
        >
          <p className={styles.textValidation}>Adicionar Carteira</p>
          <input
            id="nome"
            placeholder="Nome"
            {...register("nome")}
            defaultValue={user?.nome}
          />
          {errors.nome && <p className={styles.erros}>{errors.nome.message}</p>}
          <input
            id="sobrenome"
            placeholder="Sobrenome"
            {...register("sobrenome")}
            defaultValue={user?.sobrenome}
          />
          {errors.sobrenome && (
            <p className={styles.erros}>{errors.sobrenome.message}</p>
          )}
          <input
            id="email"
            placeholder="E-mail"
            {...register("email")}
            defaultValue={user?.email}
          />
          {errors.email && (
            <p className={styles.erros}>{errors.email.message}</p>
          )}
          <div className={styles.valorDeCompra}>
            <input
              id="valor_carteira"
              placeholder="Valor de compra(Números)"
              {...register("valor_carteira")}
              onChange={handleChange}
              defaultValue={user?.valor_carteira}
            />
            <span className={styles.textBTC}>
              BTC
              {""}
              {btcValue !== null ? `${btcValue.toFixed(8)}` : ""}
            </span>
          </div>
          {errors.valor_carteira && (
            <p className={styles.erros}>{errors.valor_carteira.message}</p>
          )}
          <div className={styles.buttonFinish}>
            <button
              className={styles.buttonCancel}
              type="button"
              onClick={() => setOpenModalEdit(false)}
            >
              Cancelar
            </button>
            <button className={styles.buttonToAdd} type="submit">
              Adicionar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
