<template>
  <div class="container">
    <div class="title">
      <h1>BTC Carteiras</h1>
      <button>Adicionar Carteira</button>
    </div>

    <div class="container-input">
      <input type="text" placeholder="Nome" />
      <input type="text" placeholder="Sobrenome" />
      <input type="email" placeholder="E-mail" />
      <button><i class="fas fa-search"></i> Buscar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Main",
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
  width: 80%;
  margin: auto;
}

.title button {
  width: 200px;
  height: 50px;
  background: #007bff;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
}

.title button:hover {
  opacity: 0.8;
}

.title button:active {
  opacity: 0.5;
}

.container-input {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  gap: 10px;
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  width: 80%;
  border-radius: 10px;
}

input {
  display: flex;
  align-items: center;
  width: 380px;
  height: 40px;
  padding-left: 5px;
  border-radius: 5px;
  border: 1px solid #ebebeb;
  font-size: 16px;
  cursor: pointer;
}

input:hover {
  border-color: #007bff;
}

.container-input button {
  display: flex;
  font-size: 16px;
  color: #007bff;
  border: 1px solid #007bff;
  border-radius: 5px;
  width: 120px;
  height: 40px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #ffffff;
  cursor: pointer;
  font-weight: bold;
}

.container-input button:hover {
    opacity: 0.8;
}

.container-input button:active {
    opacity: 0.5;
}
</style>
