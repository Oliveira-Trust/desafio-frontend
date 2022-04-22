<template>
  <div id="app">
    <NavBar />
    <div class="app-container">
      <div class="app-container-body">
        <div class="app-title">
          <h1>BTC Carteiras</h1>
          <div class="app-title-add-button">
            <Button label="Adicionar Carteira"/>
          </div>
        </div>
        <div class="app-body">
          <Card class="app-body-filter">
            <FilterInput/>
          </Card>
          <Card class="app-body-table">
            <UsersTable/>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UsersTable from './components/feature/UsersTable.vue'
import Card from './components/reusable/Card.vue'
import Button from './components/reusable/Button.vue'
import NavBar from './components/feature/NavBar.vue'
import FilterInput from './components/feature/FilterInput.vue'
import './style.css'

export default {
  name: 'App',
  components: {
    UsersTable,
    Card,
    Button,
    NavBar,
    FilterInput,
  },
  async created () {
    await this.$store.dispatch('pullUsers', { currentPage: 1 });
  },
}
</script>

<style scoped>
h1 {
  padding: 30px 0;
  font-weight: 900;
}

.app-container {
  display: flex;
  justify-content: center;
}

.app-container-body {
  width: 80vw;
}

.app-title {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}

.app-title-add-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
}

.app-body {
  padding: 20px 0;
}

.app-body-filter {
  margin-bottom: 40px;
}

@media only screen and (max-width: 790px) {
  .app-container-body {
    width: 90vw;
  }
}
</style>
