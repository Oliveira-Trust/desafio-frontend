<template>
  <div id="container">
    <img src="@/assets/logo.png" alt="Logo Oliveira Trust" />

    <div id="profile">
      <i class="fas fa-user icon"></i>
      Otávio Oliveira
      <i class="fas fa-sign-out-alt signout"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "UpBar",
};
</script>
<style scoped>
#container {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 120px;
}

img {
  width: 300px;
  height: 110px;
  background-color: #ffffff;
}

#profile {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 40px;
  gap: 10px;
  background-color: #ffffff;
  font-size: 20px;
}

.icon {
  background-color: #ffffff;
  font-size: 26px;
}

.signout {
  background-color: #ffffff;
  margin-left: 20px;
}
</style>
