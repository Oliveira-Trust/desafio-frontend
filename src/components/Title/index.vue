<template>
  <div class="containter-title">
    <h1 class="title">BTC Carteiras</h1>
    <button @click="$emit('add')" class="btn">Adicionar Carteira</button>
  </div>
</template>
<script>
export default {
  name: "Title",
};
</script>
<style scoped>
.containter-title {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
  padding: 60px 0 30px;
}
.title {
  font-size: 1.7rem;
}
.btn {
  background: #0069d9;
  border: none;
  color: #fff;
  cursor: pointer;
  display: grid;
  height: 40px;
  max-width: 170px;
  outline: none;
  place-items: center;
  transition: all 0.3s ease-out;
  width: 100%;
}
.btn:hover {
  background: #fff;
  color: #0069d9;
}
</style>
