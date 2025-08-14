import axios from "axios";
import { use, useEffect, useState } from "react";
import FilterForm from "../components/shared/filter/Filter";
import Wallets from "../components/shared/wallet-list/WalletList";
import type { IUser } from "../models/user.interface";
import CurrencyInputBRL from "../components/shared/currency-input/CurrencyInput";
import React from "react";
import { useToast } from "../context/ToastContext";
import AddNewUserModal from "../components/shared/add-new-user-modal/AddNewUserModal";
import { useModal } from "../context/ModalContext";



const HomePage = React.memo(() => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [users, setUsers] = useState<IUser[]>([]);
  const { openModal, closeModal } = useModal()!;
  const toast = useToast();
  const [btcPrice, setBTCPrice] = useState<number>(0);

  const openToast = (message: string, type?: string) => {
    if (toast) {
      toast.open(message, type);
    }
  };
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }

  const convertResponseData = (data: IUser[]) => {
    return data.map(user => ({
      ...user,
      data_nascimento: formatDate(user.data_nascimento) || '-',
      data_abertura: formatDate(user.data_abertura) || '-',
      valor_carteira: user.valor_carteira ? parseFloat(user.valor_carteira.toString()) : 0,
    }));
  }

  const pageChange = (page: number) => {
    setPage(page);
    async function fetchData() {
      try {
        const response = await axios.get<IUser[]>(`${BASE_URL}/users?_page=${page}&_per_page=10`);
        const totalCount = response.headers['x-total-count'];
        const data = convertResponseData(response.data);
        setUsers(data);
        setTotalCount(totalCount);
      } catch (error) {
        console.error("Error fetching users:", error);
        openToast("Houve um problema ao carregar os usuários, tente novamente!");
      }
    }
    fetchData();
  };

  const deleteUser = async (id: string | string) => {
    try {
      await axios.delete(`${BASE_URL}/users/${id}`);
    } catch (error) {
      console.error("Error deleting user:", error);
      openToast("Erro ao excluir usuário, tente novamente!");
    } finally {
      getUsers();
      openToast("Usuário excluído com sucesso!", "success");
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get<IUser[]>(
        `${BASE_URL}/users?_page=${page}&_per_page=10`
      );
      const totalCount = response.headers["x-total-count"];
      const data = convertResponseData(response.data);
      setUsers(data);
      setTotalCount(totalCount);
    } catch (error) {
      console.error("Error fetching users:", error);
      openToast("Houve um problema ao carregar os usuários, tente novamente!");
    }
  }

  const filter = async (data: { name: string; lastName: string; email: string }) => {
    setPage(1);
    try {
      const response = await axios.get<IUser[]>(
        `${BASE_URL}/users?nome_like=${data.name}&sobrenome_like=${data.lastName}&email_like=${data.email}&_page=${page}&_per_page=10`
      );
      const totalCount = response.headers["x-total-count"];
      const filteredData = convertResponseData(response.data);
      setUsers(filteredData);
      setTotalCount(totalCount);
    } catch (error) {
      console.error("Error filtering users:", error);
    }
  };

  const addNewUser = async (user) => {
    try {
      const u = {
        ...user,
        data_abertura: new Date().toISOString(),
        valor_carteira: user.valor_compra ? parseFloat(user.valor_compra.replace(',', '.')) : 0,
      };
      await axios.post(`${BASE_URL}/users`, user);
    } catch (error) {
      console.error("Error adding user:", error);
    } finally {
      getUsers();
      closeModal();
      openToast("Usuário adicionado com sucesso!", "success");
    }
  };

  const openAddUserModal = () => {
    return openModal(
      <AddNewUserModal
        onSubmit={addNewUser}
      ></AddNewUserModal>
    );
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold mb-4">BTC Carteiras</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
          onClick={openAddUserModal}
        >
          Adicionar Carteira
        </button>
      </div>
      <FilterForm onSubmit={(data) => filter(data)} />
      <Wallets
        data={users}
        btcPrice={btcPrice}
        totalCount={totalCount}
        onDelete={(id) => deleteUser(id)}
        onPageChange={(page) => pageChange(page)}
      />
    </>
  );
});

export default HomePage;
