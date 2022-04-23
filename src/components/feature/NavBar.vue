<template>
  <div class="nav-bar">
    <div class="nav-bar-contents">
      <div class="nav-bar-content">
        <img src="../../assets/logo.png" alt="Oliveira Trust Logo" class="logo"/>
        <h2>OLIVEIRA TRUST</h2>
      </div>
      <div class="nav-bar-content">
        <ProfileAvatar/>
        <b class="nav-bar-content-username">Otávio Oliveira</b>
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
  box-shadow: #9999993D 0px 3px 8px;
  display: flex;
  justify-content: center;
}

.nav-bar-contents {
  width: 80%;
  height: 100%;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-bar-content{
  display: flex;
  align-items: center;
}

.logo {
  margin-right: 10px;
  width: 30px;
}

.nav-bar-content-username {
  margin: 0 10px;
}

@media only screen and (max-width: 790px) {
  .nav-bar-content > h2 {
    display: none;
  }

  .nav-bar-contents {
    width: 90%;
  }
}
</style>
