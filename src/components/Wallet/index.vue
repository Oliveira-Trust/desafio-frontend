<template>
  <div class="container-wallet">
    <div class="container-wallet-title">
      <h4 class="wallet-title">Carteiras</h4>
      <button class="btn" @click="$emit('handleCsv')">Exportar CSV</button>
    </div>
    <Table
      :users="users"
      @updateUser="$emit('updateUser', $event)"
      @deleteUser="$emit('deleteUser', $event)"
    />
  </div>
</template>
<script>
import Table from "@/components/Table";
export default {
  name: "Wallet",
  props: {
    users: { type: Array, default: () => [] },
  },
  components: { Table },
};
</script>
<style scoped>
.container-wallet {
  background: #fff;
  border-radius: 8px 8px 0px 0px;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
  margin-top: 20px;
  padding-bottom: 20px;
}
.container-wallet-title {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
  padding: 20px 20px 0px;
  width: 100%;
}
.btn {
  background: #fff;
  border: 1px solid #0069d9;
  color: #0069d9;
  cursor: pointer;
  height: 40px;
  outline: none;
  transition: all 0.3s ease-out;
  width: 130px;
}
.btn:hover {
  background: #0069d9;
  color: #fff;
}
</style>
