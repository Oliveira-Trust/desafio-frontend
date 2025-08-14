import axios from "axios";
import { Pencil, Trash } from "lucide-react";
import React, { useState } from "react";
import { useModal } from "../../../context/ModalContext";
import type { IUser } from "../../../models/user.interface";
import Pagination from "../pagination/Pagination";
import Tooltip from "../tooltip/Tooltip";
import DeleteUserModal from "../delete-user-modal/DeleteUserModal";
import EditUserModal from "../edit-user-modal/EditUserModal";

interface WalletListProps {
  data: IUser[];
  btcPrice: number;
  totalCount: number;
  onDelete?: (id: string | number) => void;
  onPageChange: (page: number) => void;
}

const WalletList: React.FC<WalletListProps> = React.memo(
  ({ data, btcPrice, totalCount, onDelete, onPageChange }) => {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const { openModal, closeModal } = useModal()!;
    const itemsPerPage = 10;

    const openDeleteUserModal = (id: string | number) => {
      openModal(
        <DeleteUserModal
          onClose={closeModal}
          onDelete={() => onDeletUser(id)}
        ></DeleteUserModal>
      );
    };

    const openEditUserModal = (user: IUser) => {
      openModal(
        <EditUserModal
          userData={user}
        ></EditUserModal>
      );
    };

    const onDeletUser = (id: string | number) => {
      if (onDelete) {
        onDelete(id);
        closeModal();
      }
    };

    return (
      <div className="bg-white border border-gray-300 p-6 rounded-md shadow-md w-full mb-6">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">Carteiras</h2>
          <button className="bg-transparent px-8 py-2 border border-blue-500 text-blue-700 rounded hover:bg-blue-500 hover:text-white">
            Exportar CSV
          </button>
        </div>
        {!data || data.length === 0 ? (
          <div className="text-gray-600 mt-4 text-center font-semibold">
            Nenhuma carteira encontrada.
          </div>
        ) : (
          <>
            <table className="table-auto min-w-full divide-y divide-gray-200 rounded-md mt-5">
              <thead className="text-gray-600 text-sm font-semibold">
                <tr>
                  <th className="p-3 text-left">Nome</th>
                  <th className="p-3 text-left">Sobrenome</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Abertura</th>
                  <th className="p-3 text-left">Bitcoin</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {data.map((user: IUser) => (
                  <tr
                    key={user.id}
                    className="border-l-3 border-transparent hover:border-l-3 hover:border-blue-500 hover:bg-gray-100 transition-all"
                  >
                    <td className="p-3">{user.nome}</td>
                    <td className="p-3">{user.sobrenome}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.data_abertura}</td>
                    <td className="p-3">{user.valor_carteira}</td>
                    <td className="p-3">
                      <div className="flex items-center justify-end space-x-2">
                        <div>
                          <Tooltip content="Editar usuário">
                            <Pencil
                              className="size-4 mr-3 cursor-pointer"
                              onClick={() => openEditUserModal(user)}
                            />
                          </Tooltip>
                        </div>
                        <div>
                          <Tooltip content="Excluir Carteira">
                            <Trash
                              className="size-4 cursor-pointer"
                              data-tooltip-id="delete-user"
                              data-tooltip-content="Excluir Carteira"
                              onClick={() => openDeleteUserModal(user.id)}
                            />
                          </Tooltip>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <hr className="mt-4" />
            <div className="flex justify-between items-center">
              <div className="mt-4 text-sm text-gray-600">
                <span>{totalCount} registro(s)</span>
              </div>

              <Pagination
                totalItems={totalCount}
                itemsPerPage={itemsPerPage}
                onPageChange={(page) => onPageChange(page)}
              />
            </div>
          </>
        )}
      </div>
    );
  }
);

export default WalletList;
function setIsModalOpen(arg0: boolean): void {
  throw new Error("Function not implemented.");
}
