import { globalVariables } from "../../global/VariaveisGlobais";
import { carregarUsuarios, adicionarUsuario } from "../../global/Requisicoes";
import crypto from 'crypto';

export default {
    props: ['isOpen'],
    data() {
        return {
            novoUsuario: {
                nome: '',
                sobrenome: '',
                email: '',
                valorCompra: ''
            },
            valorbitcoin: 0, 
            usuarios: [] 
        };
    },
    async created() {
        // Carregar os usuários quando o componente for criado
        try {
            globalVariables.usersData = await carregarUsuarios();
            globalVariables.filteredUsers = await carregarUsuarios();
        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
        }
    },
    methods: {
        bitcoinValue() {
            if (this.novoUsuario.valorCompra) {
                this.valorbitcoin = parseFloat(this.novoUsuario.valorCompra) / globalVariables.askBitcoin;
            } else {
                this.valorbitcoin = 0;
            }
        },

        cancelar() {
            globalVariables.addModalIsOpen = false;
            this.novoUsuario = {
                nome: '',
                sobrenome: '',
                email: '',
                valorCompra: ''
            };
        },

        async adicionar() {
            if (!this.validarCampos()) {
                alert("Por favor, preencha todos os campos corretamente.");
                return; // Sair da função se os campos não estiverem preenchidos corretamente
            }
            // Verificar se o email já existe nos usuários carregados
            const emailExistente = globalVariables.usersData.some(usuario => usuario.email === this.novoUsuario.email);

            if (emailExistente) {
                alert("Já existe um usuário com o endereço de email digitado.");
                return; // Sair da função se o email já existir
            }

            // Criando o objeto de usuário
            const novoObjetoUsuario = {
                nome: this.novoUsuario.nome,
                sobrenome: this.novoUsuario.sobrenome,
                email: this.novoUsuario.email,
                data_abertura: new Date().toISOString(), // Obtendo a data atual em formato ISO
                valor_carteira: this.valorbitcoin,
                endereco_carteira: this.criarEnderecoCarteira() // Chamando a função para criar o endereço da carteira
            };

            // Enviando o objeto de usuário para a API
            try {
                await adicionarUsuario(novoObjetoUsuario);
                alert("Usuário adicionado com sucesso!");
                globalVariables.usersData = await carregarUsuarios();
                globalVariables.filteredUsers = await carregarUsuarios();
                this.cancelar();
            } catch (error) {
                console.error('Erro ao adicionar usuário:', error);
            }
        },
        //criando endereço da carteira
        criarEnderecoCarteira() {
            const dadosUsuario = `${this.novoUsuario.nome}${this.novoUsuario.sobrenome}${this.novoUsuario.email}`;
            const hash = crypto.createHash('sha256').update(dadosUsuario).digest('hex');
            const enderecoCarteira = hash.substring(0, 34);

            return enderecoCarteira;
        },

        toggleLabel(field) {
            this.novoUsuario[field] = this.novoUsuario[field].trim();
        },

        validarCampos() {
            return (
                this.novoUsuario.nome.trim() !== '' &&
                this.novoUsuario.sobrenome.trim() !== '' &&
                this.novoUsuario.email.trim() !== '' &&
                this.validarEmail(this.novoUsuario.email)
            );
        },

        validarEmail(email) {
            const emailRegex = /\S+@\S+\.\S+/;
            return emailRegex.test(email);
        }
    }
};
