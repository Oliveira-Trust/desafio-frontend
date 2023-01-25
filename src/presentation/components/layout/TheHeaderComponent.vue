<template>
  <v-system-bar
  id="header"
  height="80"
  class="pa-5"
  >
    <v-container>
      <v-row>
        <v-col id="logo" cols="2">      
          <img width="215px" src="../../../assets/logotipo_padrao_grey.svg" alt="logotipo Oliveira Trust" class="logo-grey ">      
        </v-col >
        <v-col id="profile" cols="10" align="end">
          <v-avatar size="35" title="John" class="clickable">
            <img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
            >
          </v-avatar>
          <span class="ml-2">
            <b>
              {{ user }}
            </b>
          </span>
          <v-icon id="logout" class="ml-2 clickable" title="Logout" >
            mdi-logout
          </v-icon>
        </v-col>
      </v-row>
    </v-container>
  </v-system-bar>
</template>

<script>
export default {

  data:()=>{
    return{
      user: "John Vuetify"
    }
  }
}
</script>

<style lang="scss" > 
@import '../../styles/variables.scss';

#header {
  background-color: $neutral-color;
}
#logout {
  font-size: 1.3rem;
}
</style>