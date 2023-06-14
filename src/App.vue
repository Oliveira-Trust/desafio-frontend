<template>
  <div id="app">
    <Header></Header>
    <span class="divider"></span>
    <Container>
      <FilterForm />
      <span class="divider"></span>
      <Content />
    </Container>
  </div>
</template>

<script>
import Header from './components/Header/Header.vue';
import Container from './components/shared/Container/Container.vue';
import FilterForm from './components/FilterForm/FilterForm.vue';
import Content from './components/ResultsContent/ResultsContent.vue';

export default {
  name: 'App',
  components: {
    Header,
    Container,
    FilterForm,
    Content
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
.divider{
  margin: 30px 0;
  display: block;
}
</style>
