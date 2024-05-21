<template>
  <div id="app">
    <HeaderComponent/>
    <TitleComponent/>
    <FilterComponent/>
    <UsersTableTemplate/>
    <AddModalComponent :isOpen="addmodalIsOpen" />
    <EditModalComponent :isOpen="editmodalIsOpen"/>
  </div>
</template>

<script>
import { carregarUsuarios, buscarPrecoBitcoin } from './global/Requisicoes';
import { globalVariables } from './global/VariaveisGlobais';

import UsersTableTemplate from './components/userstable/UsersTable.vue';
import FilterComponent from './components/filtercomponent/FilterComponent.vue';
import TitleComponent from './components/titlecomponent/TitleComponent.vue';
import HeaderComponent from './components/headercomponent/HeaderComponent.vue';
import AddModalComponent from './components/addmodalcomponent/AddModalComponent.vue';
import EditModalComponent from './components/editmodalcomponent/EditModalComponent.vue';

export default {
  name: 'App',
  components: {
    UsersTableTemplate,
    FilterComponent,
    TitleComponent,
    HeaderComponent,
    AddModalComponent,
    EditModalComponent
  },
  computed: {
    addmodalIsOpen(){
      return globalVariables.addModalIsOpen;
    },
    editmodalIsOpen(){
      return globalVariables.editModalIsOpen;
    },
  },
  methods: {
    async carregarUsuarios() {
      try {
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
        console.error('Erro ao buscar dados da API:', error);
      }
    },
    async atualizarPrecoBitcoin() {
      try {
        const { bid, ask } = await buscarPrecoBitcoin();
        globalVariables.bidBitcoin = bid;
        globalVariables.askBitcoin = ask;
        
      } catch (error) {
        console.error('Erro ao atualizar preço do Bitcoin:', error);
      }
    },
  },
  created() {
    this.carregarUsuarios();
    this.atualizarPrecoBitcoin();
    setInterval(this.atualizarPrecoBitcoin, 60000);


  }
}
</script>

<style>
*{
  padding:0;
  margin:0;
  border:0;
  box-sizing: border-box;
}
#app {
  
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  background-color: #f5f6f8;
}
</style>
