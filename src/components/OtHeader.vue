<template>
  <header class="container">
    <div class="logo-wrapper">
      <img
        class="header-logo"
        src="../assets/logo.svg"
        alt="oliveira trust logo"
      />
      <h1>BTC Carteiras</h1>
    </div>

    <b-btn class="add-wallet-btn" size="sm" @click="$emit('create-wallet')">
      Adicionar Carteira
    </b-btn>
  </header>
</template>

<script>
export default {
  name: "OtHeader"
};
</script>

<style scoped>
header {
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
}

.logo-wrapper {
  display: flex;
  align-items: center;
}

.logo-wrapper img {
  margin-right: 15px;
}

.logo-wrapper h1 {
  font-size: 1rem;
  font-weight: normal;
  margin-bottom: 0;
}

.header-logo {
  width: 250px;
  height: auto;
}

@media (max-width: 576px) {
  header {
    flex-wrap: wrap;
    padding: 15px;
  }

  .logo-wrapper {
    width: 100%;
    margin-bottom: 15px;
  }

  .header-logo {
    width: 200px;
  }

  .add-wallet-btn {
    margin-left: auto;
  }
}
</style>
