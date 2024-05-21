import { globalVariables } from '../../global/VariaveisGlobais';

export default {
  name: 'FilterComponent',
  data() {
    return {
      filtroNome: '',
      filtroSobrenome: '',
      filtroEmail: ''
    };
  },
  methods: {
    aplicarFiltro() {
      // Pegando os valores dos filtros
      const { filtroNome, filtroSobrenome, filtroEmail } = this;
      
      // Filtrando os usuários
      globalVariables.filteredUsers = globalVariables.usersData.filter(user => {
        const nome = user.nome.toLowerCase();
        const sobrenome = user.sobrenome.toLowerCase();
        const email = user.email.toLowerCase();
      globalVariables.currentPage=1;
        return (
          nome.includes(filtroNome.toLowerCase()) &&
          sobrenome.includes(filtroSobrenome.toLowerCase()) &&
          email.includes(filtroEmail.toLowerCase())
        );
      });
      
      // Log do resultado do filtro
    
    }
  }
};

