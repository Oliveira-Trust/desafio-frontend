export type IUser = {
  id: number | string;
  nome: string;
  sobrenome: string;
  email: string;
  endereco: string;
  data_nascimento: string;
  data_abertura: string;
  valor_carteira: string;
  endereco_carteira: string;
  valor_compra?: string;
};
