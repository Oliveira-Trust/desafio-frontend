<template>
  <div class="nav-bar">
    <div class="nav-bar__contents">
      <div class="nav-bar__content">
        <img src="../../assets/logo.png" alt="Oliveira Trust Logo" class="logo"/>
        <h2>OLIVEIRA TRUST</h2>
      </div>
      <div class="nav-bar__content">
        <ProfileAvatar/>
        <b class="nav-bar__content__username">Otávio Oliveira</b>
        <IconButton name="arrow-right-from-bracket"/>
      </div>
    </div>
  </div>
</template>

<script>
import IconButton from '../reusable/IconButton'
import ProfileAvatar from './ProfileAvatar'

export default {
  name: 'NavBar',
  components: {
    IconButton,
    ProfileAvatar,
  }
}
</script>

<style scoped>
h2 {
  font-weight: 900;
}

.nav-bar {
  height: 80px;
  background-color: #FFFFFF;
  box-shadow: 0 2px #DDDDDD;
  padding: 0 80px;
}

.nav-bar__contents {
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-bar__content{
  display: flex;
  align-items: center;
}

.logo {
  margin-right: 20px;
  width: 40px;
}

.nav-bar__content__username {
  margin: 0 10px;
}
</style>
