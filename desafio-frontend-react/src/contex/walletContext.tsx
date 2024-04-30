import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import Users from "../services/users";
import { User } from "../types/user";

interface WalletContextType {
  fetchUsers: () => void;
  listWallet: User[];
  deleteUser: (id: string) => void;
}

const WalletContext = createContext<WalletContextType | null>(null);

export const useWalletContext = () => {
  const context = useContext(WalletContext);

  if (!context) {
    throw new Error("useWalletContext está fora de contexto");
  }

  return context;
};

export const WalletProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [listWallet, setListWallet] = useState<User[]>([]);

  const deleteUser = (id: string) => {
    Users.deletar(id)
      .then((res) => {
        if (res.status === 200) {
          fetchUsers();
        } else {
          console.log("Erro ao deletar usuário");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchUsers = () => {
    Users.listar()
      .then((res) => {
        setListWallet(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const contextValue: WalletContextType = {
    fetchUsers,
    listWallet,
    deleteUser,
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};
