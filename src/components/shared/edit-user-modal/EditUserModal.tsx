import { useEffect, useState } from "react";
import type { IUser } from "../../../models/user.interface";
import CurrencyInputBRL from "../currency-input/CurrencyInput";
import { useModal } from "../../../context/ModalContext";
import axios from "axios";
import { useToast } from "../../../context/ToastContext";

type WalletListProperties = {
  userData: Partial<User>;
  onSubmit: (user: Partial<IUser>) => void;
};

type User = Partial<IUser>;
const EditUserModal: React.FC<WalletListProperties> = ({
  userData,
}) => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const BTC_CURRENCY = "BTC";
  const BRL_CURRENCY = "BRL";
  const { closeModal } = useModal()!;
  const [currencyValue, setCurrencyValue] = useState(0);
  const [btcPrice, setBTCPrice] = useState(0);
  const [btcAmount, setBTCAmount] = useState(0);
  const [form, setForm] = useState({
    id: userData.id,
    nome: userData.nome,
    sobrenome: userData.sobrenome,
    email: userData.email,
    valor_carteira: userData.valor_carteira,
    data_abertura: userData.data_abertura,
  });

  const toast = useToast();

  const hasEmptyField = () => {
    return !form.nome || !form.sobrenome || !form.email || !form.valor_carteira;
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (hasEmptyField()) {
      return;
    }

    updateUser();
    closeModal();
  };

  const fetchExchange = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_CURRENCY_API_URL
        }/${BTC_CURRENCY}-${BRL_CURRENCY}?token=${
          import.meta.env.VITE_CURRENCY_API_TOKEN
        }`
      );
      const price = parseFloat(response.data["BTCBRL"].bid);
      setBTCPrice(price);
      convertToCurrency();
    } catch (error) {
      console.error("Erro ao buscar taxas de câmbio", error);
    }
  };

  const convertToCurrency = () => {
    if (userData.valor_carteira) {
      setCurrencyValue(parseFloat(userData.valor_carteira) * btcPrice);
      setBTCAmount(parseFloat(userData.valor_carteira) / btcPrice);
    } else {
      setCurrencyValue(0);
    }
  };

  const convertBTCPrice = (e) => {
    const value = e.target.value.replace(/[^\d,]/g, "");
    const formattedValue = value.replace(",", ".");
    if (formattedValue) {
      setBTCAmount(parseFloat(formattedValue) / btcPrice);
    } else {
      setBTCAmount(0);
    }
  };

  const updateUser = async () => {
    try {
      const user = {
        ...form,
        data_abertura: new Date().toISOString(),
        valor_carteira: form.valor_carteira?.toString()
      };
      await axios.put(`${BASE_URL}/users/${user.id}`, user);
    } catch (error) {
      console.error("Error update user:", error);
    } finally {
      toast?.open("Usuário atualizado com sucesso!", "success");
      closeModal();
    }
  };

  useEffect(() => {
    fetchExchange();
  }, [currencyValue, btcPrice, btcAmount]);

  return (
    <div className="p-10 pb-8 pt-8 flex flex-col m-auto">
      <h2 className="text-lg font-semibold mb-0.5">Atualizar Carteira</h2>
      <hr className="text-gray-300" />
      <form onSubmit={handleSubmit} className="mt-8">
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={onChange}
          className="mb-3 border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
        <input
          type="text"
          name="sobrenome"
          placeholder="Sobrenome"
          value={form.sobrenome}
          onChange={onChange}
          className="mb-3 border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          className="mb-3 border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
        <CurrencyInputBRL
          name="valor_compra"
          value={currencyValue}
          onChange={convertBTCPrice}
        />
        <span className="font-bold text-xl"> BTC {form.valor_carteira}</span>

        <div className="flex justify-end mt-6">
          <button
            type="button"
            className="bg-transparent px-8 py-2  border-blue-500 text-blue-700 rounded mr-4"
            onClick={closeModal}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
            disabled={hasEmptyField()}
          >
            Atualizar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserModal;
