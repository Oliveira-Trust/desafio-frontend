<template>
  <header class="container-header">
    <div class="header">
      <img
        class="logo"
        src="../../assets/images/logotipo.svg"
        alt="Logo Oliveira Trust"
      />
      <div class="userLogged">
        <font-awesome-icon icon="user" class="icon-user" />
        <p>Otávio Oliveira</p>
        <font-awesome-icon
          icon="fa-solid fa-arrow-right-from-bracket"
          class="icon-exit"
        />
      </div>
    </div>
  </header>
</template>
<script>
export default {
  name: "Header",
};
</script>
<style scoped>
.container-header {
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}
.header {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1300px;
  padding: 20px 10px;
  user-select: none;
}
.logo {
  height: auto;
  max-width: 230px;
  width: 100%;
}
.userLogged {
  align-items: center;
  display: flex;
  user-select: none;
}
.icon-user {
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.7);
  font-size: 20px;
  height: 20px;
  margin-right: 5px;
  padding: 3px;
  width: 20px;
}
.icon-exit {
  cursor: pointer;
  font-size: 16px;
  margin-left: 20px;
}
</style>
