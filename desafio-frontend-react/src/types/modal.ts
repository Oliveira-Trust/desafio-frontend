export type ModalProps = {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
};

export type ModalDeleteProps = {
  id: string;
  openModalDelete: boolean;
  setOpenModalDelete: (value: boolean) => void;
};

export type ModalEditProps = {
  user: {
    id: string;
    email: string;
    nome: string;
    sobrenome: string;
    valor_carteira: number;
  };
  openModalEdit: boolean;
  setOpenModalEdit: (value: boolean) => void;
};
