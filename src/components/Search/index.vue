<template>
  <div class="search">
    <Input
      id="search_nome"
      label="Nome"
      type="search"
      :value="user.nome"
      :autoComplete="false"
      @update:input="handleInput($event)"
    />
    <Input
      id="search_sobrenome"
      label="Sobrenome"
      type="search"
      :value="user.sobrenome"
      :autoComplete="false"
      @update:input="handleInput($event)"
    />
    <Input
      id="search_email"
      label="E-mail"
      type="search"
      :value="user.email"
      :autoComplete="false"
      @update:input="handleInput($event)"
    />
    <button class="btn" @click="$emit('update:submit')">
      <font-awesome-icon icon="fa-solid fa-magnifying-glass" /> Buscar
    </button>
  </div>
</template>
<script>
import Input from "../Input";
export default {
  name: "Search",
  components: { Input },
  data: () => ({
    user: {
      nome: "",
      sobrenome: "",
      email: "",
    },
  }),
  methods: {
    resetUser() {
      this.user = {
        nome: "",
        sobrenome: "",
        email: "",
      };
    },
    handleInput(e) {
      this.resetUser();
      const key = e.key.replace("search_", "");
      this.user[key] = e.val;
      this.$emit("update:input", e);
    },
  },
};
</script>
<style scoped>
.search {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px;
}
.btn {
  background: #fff;
  border: 1px solid #0069d9;
  color: #0069d9;
  cursor: pointer;
  height: 40px;
  outline: none;
  transition: all 0.3s ease-out;
  width: 120px;
}
.btn:hover {
  background: #0069d9;
  color: #fff;
}
</style>
