import { Trash } from 'lucide-react';
import React from 'react';

interface DeleteUserModalProps {
  onClose: () => void;
  onDelete: () => void;
}

const DeleteUserModal = ({ onClose, onDelete }: DeleteUserModalProps) => {
  return (
    <div className="p-4 flex flex-col items-center m-auto p-10">
      <div className="rounded-full border-1 border-solid border-red-500 w-12 h-12 flex items-center justify-center mb-4">
        <Trash className="text-red-500 font-bold text-lg" />
      </div>
      <h2 className="text-lg font-bold mb-2">Excluir Carteira</h2>
      <p className="mb-4 text-center">
        Tem certeza de que deseja excluir esta carteira?
        <br />
        Esta ação não poderá ser desfeita.
      </p>
      <div className="flex flex-col space-y-2 w-full">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded font-semibold hover:bg-red-600"
          onClick={() => onDelete()}
        >
          Excluir
        </button>
        <button
          className="px-4 py-2 text-blue-500 rounded hover:bg-blue-500 hover:text-white border border-blue-500"
          onClick={() => onClose()}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default DeleteUserModal;
