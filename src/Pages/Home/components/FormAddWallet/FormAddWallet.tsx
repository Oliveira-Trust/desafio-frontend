import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "../../../../components/Modal/Modal";

import { useForm } from "react-hook-form";

import Users from "../../../../services/users.tsx";

import Modedas from "../services/moedas.tsx";

import styles from "./FormAddWallet.module.css";
import { useState } from "react";
import type { ModalProps } from "../../../../types/modal.ts";
import { useWalletContext } from "../../../../contex/walletContext.tsx";
import {
  ProfileSchema,
  profileSchema,
} from "../../../../validation/SchemaValidation.ts";

export function FormAddWallet({ openModal, setOpenModal }: ModalProps) {
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
      const addWallet = { ...data, valor_carteira: btcValueFormatted };

      Users.salvar(addWallet).then(() => {
        setOpenModal(false);
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
        isOpen={openModal}
        setOpenModal={() => {
          setOpenModal(!setOpenModal);
        }}
      >
        <form
          onSubmit={handleSubmit(handleAddWallet)}
          className={styles.formValidation}
        >
          <p className={styles.textValidation}>Adicionar Carteira</p>
          <input id="nome" placeholder="Nome" {...register("nome")} />
          {errors.nome && <p className={styles.erros}>{errors.nome.message}</p>}
          <input
            id="sobrenome"
            placeholder="Sobrenome"
            {...register("sobrenome")}
          />
          {errors.sobrenome && (
            <p className={styles.erros}>{errors.sobrenome.message}</p>
          )}
          <input id="email" placeholder="E-mail" {...register("email")} />
          {errors.email && (
            <p className={styles.erros}>{errors.email.message}</p>
          )}
          <div className={styles.valorDeCompra}>
            <input
              id="valor_carteira"
              placeholder="Valor de compra(Números)"
              {...register("valor_carteira")}
              onChange={handleChange}
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
              onClick={() => setOpenModal(false)}
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
