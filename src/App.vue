<template>
  <div id="app">
    <Header></Header>
    <Divider />
    <Container>
      <Heading inverse actionLabel="Adicionar Carteira" @onClick="openModal">
        <h2>BTC Carteira</h2>
      </Heading>
      <Divider />
      <FilterForm />
      <Divider />
      <Content />
    </Container>
    <AddWalletModal
      v-if="isOpenModal"
      @onClose="closeModal"
    />
  </div>
</template>

<script>
import Header from './components/Header/Header.vue';
import Container from './components/shared/Container/Container.vue';
import Heading from './components/shared/Heading/Heading.vue';
import FilterForm from './components/FilterForm/FilterForm.vue';
import Content from './components/ResultsContent/ResultsContent.vue';
import AddWalletModal from './components/AddWalletModal/AddWalletModal.vue';
import Divider from './components/shared/Divider/Divider.vue'

export default {
  name: 'App',
  components: {
    Header,
    Container,
    FilterForm,
    Heading,
    Content,
    AddWalletModal,
    Divider
  },
  data(){
    return {
        isOpenModal: false
    }
  },
  methods: {
    openModal(){
      this.isOpenModal = true
    },
    closeModal(){
      this.isOpenModal = false
    }
  }
}
</script>

<style>

@import './assets/styles/variables.css';

*{
  margin: 0;
  padding: 0;
}
body{
  background-color: #f5f6f8;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
