import { globalVariables } from '../../global/VariaveisGlobais';
import { deletarUsuario, carregarUsuarios, buscarUsuarioPorId} from '../../global/Requisicoes';
import { saveAs } from 'file-saver';
export default {
  computed: {
    // Retorna os usuários filtrados de acordo com a página atual e itens por página
    usersFiltrados() {
      const inicio = (globalVariables.currentPage - 1) * globalVariables.itemsPerPage;
      const fim = inicio + globalVariables.itemsPerPage;
      return globalVariables.filteredUsers.slice(inicio, fim);
    },
    paginadestacada(){
      return globalVariables.currentPage;
    },
    // Calcula o número total de páginas com base nos usuários filtrados
    numeroDePaginas() {
      return Math.ceil(globalVariables.filteredUsers.length / globalVariables.itemsPerPage);
    }
  },
  
  methods: {
    // Vai para a próxima página
    proximaPagina() {
      if (globalVariables.currentPage < this.numeroDePaginas) {
        globalVariables.currentPage++;
      }
    },
    
    // Vai para a página anterior
    paginaAnterior() {
      if (globalVariables.currentPage > 1) {
        globalVariables.currentPage--;
      }
    },
    
    async editUser(id) {
      try {
        
        const user = await buscarUsuarioPorId(id);


        globalVariables.editUser.nome = user.nome;
        globalVariables.editUser.sobrenome = user.sobrenome;
        globalVariables.editUser.email = user.email;
        globalVariables.editUser.valorReais = user.valor_carteira * globalVariables.bidBitcoin;
        globalVariables.editModalIsOpen=true; 
        globalVariables.editUser.id = user.id; 
        globalVariables.id = id;
        globalVariables.editUser.data_nascimento = user.data_nascimento;
        globalVariables.editUser.data_abertura = user.data_abertura;
        globalVariables.editUser.endereco = user.endereco

        
      } catch (error) {
        console.error('Erro ao obter dados do objeto:', error);
      }
    },
    irParaPagina(pagina) {
      globalVariables.currentPage = pagina;
    },
    async removeUser(id) {
      try {
          await deletarUsuario(id);

          const responseData = await carregarUsuarios(); 
          
          const usersData = responseData.map(user => ({
            id: user.id,
            nome: user.nome,
            sobrenome: user.sobrenome,
            email: user.email,
            valor_carteira: user.valor_carteira
          }));
          globalVariables.usersData = usersData;
          globalVariables.filteredUsers = usersData;
  
      } catch (error) {
          console.error('Erro ao deletar usuário e atualizar página:', error);
      }
    },
    exportarCSV() {
      // Criar o cabeçalho do CSV
      const csvContent = [
        ['Nome', 'Sobrenome', 'Email', 'Bitcoin'], // Cabeçalho do CSV
      ];

      // Adicionar os dados dos usuários ao array de conteúdo CSV
      globalVariables.usersData.forEach(user => {
        csvContent.push([user.nome, user.sobrenome, user.email, user.valor_carteira]);
      });

      // Converter o array de conteúdo CSV em uma string CSV
      const csvString = csvContent.map(row => row.join(',')).join('\n');

      // Criar um Blob com o conteúdo CSV
      const csvBlob = new Blob([csvString], { type: 'text/csv;charset=utf-8' });

      // Usar FileSaver.js para baixar o arquivo CSV
      saveAs(csvBlob, 'usuarios.csv');
    }
  
  }
};