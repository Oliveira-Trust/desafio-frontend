import { globalVariables } from "../../global/VariaveisGlobais";
import { buscarUsuarioPorId, editarUsuario, carregarUsuarios } from "../../global/Requisicoes";
import crypto from 'crypto';

export default {
  props: ['isOpen'],
  data() {
    return {
      usuarioEditado: {
        nome: '',
        sobrenome: '',
        email: '',
        valorCompra: ''
      },
      valorbitcoin: 0
    };
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.inicializarUsuarioEditado();
      }
    }
  },
  methods: {
    inicializarUsuarioEditado() {
      this.usuarioEditado = {
        nome: globalVariables.editUser.nome,
        sobrenome: globalVariables.editUser.sobrenome,
        email: globalVariables.editUser.email,
        valorCompra: globalVariables.editUser.valorReais
      };
      this.bitcoinValue();
    },
    bitcoinValue() {
      if (this.usuarioEditado.valorCompra) {
        this.valorbitcoin = parseFloat(this.usuarioEditado.valorCompra) / globalVariables.askBitcoin;
      } else {
        this.valorbitcoin = 0;
      }
    },
    criarEnderecoCarteira() {
      const dadosUsuario = `${this.usuarioEditado.nome}${this.usuarioEditado.sobrenome}${this.usuarioEditado.email}`;
      const hash = crypto.createHash('sha256').update(dadosUsuario).digest('hex');
      const enderecoCarteira = hash.substring(0, 34);
      return enderecoCarteira;
    },
    async editar() {
      if (!this.validarCampos()) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
      }
      try {
        const objetoOriginal = await buscarUsuarioPorId(globalVariables.id);
        const usuariosSemUsuarioOriginal = globalVariables.usersData.filter(usuario => usuario.id !== objetoOriginal.id);
        const emailExistente = usuariosSemUsuarioOriginal.some(usuario => usuario.email === this.usuarioEditado.email);

        if (emailExistente) {
          alert("Já existe um usuário com o endereço de email digitado.");
          return;
        }

        const editadoObjetoUsuario = {
          id: globalVariables.editUser.id,
          nome: this.usuarioEditado.nome,
          sobrenome: this.usuarioEditado.sobrenome,
          email: this.usuarioEditado.email,
          valor_carteira: this.valorbitcoin,
          endereco_carteira: this.criarEnderecoCarteira(),
          data_nascimento: globalVariables.editUser.data_nascimento,
          data_abertura: globalVariables.editUser.data_abertura,
          endereco: globalVariables.editUser.endereco
        };
        await editarUsuario(globalVariables.editUser.id, editadoObjetoUsuario);

        globalVariables.usersData = await carregarUsuarios();
        globalVariables.filteredUsers = await carregarUsuarios();

        alert("Usuário editado com sucesso!");
        this.cancelar();
      } catch (error) {
        console.error('Erro ao editar usuário:', error);
      }
    },
    cancelar() {
      globalVariables.editModalIsOpen = false;
      this.usuarioEditado = {
        nome: '',
        sobrenome: '',
        email: '',
        valorCompra: ''
      };
      this.valorbitcoin = 0;
    },
    toggleLabel(field) {
      this.usuarioEditado[field] = this.usuarioEditado[field].trim();
    },
    validarCampos() {
      return (
        this.usuarioEditado.nome.trim() !== '' &&
        this.usuarioEditado.sobrenome.trim() !== '' &&
        this.usuarioEditado.email.trim() !== '' &&
        this.validarEmail(this.usuarioEditado.email)
      );
    },
    validarEmail(email) {
      const emailRegex = /\S+@\S+\.\S+/;
      return emailRegex.test(email);
    }
  }
};
