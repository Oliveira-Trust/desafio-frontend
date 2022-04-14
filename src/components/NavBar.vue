<template>
  <div class="nav-bar">
    <div class="nav-bar__content">
      <div class="nav-bar__content__logomark">
        <img src="../assets/logo.png" class="logo"/>
        <h2>OLIVEIRA TRUST</h2>
      </div>
      <div>
        Profile
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
}
</script>

<style scoped>
.nav-bar {
  height: 80px;
  width: 100vw;
  background-color: #FFFFFF;
}

.nav-bar__content {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-bar__content__logomark {
  display: flex;
  align-items: center;
}

.logo {
  margin-right: 20px;
  width: 40px;
}
</style>
