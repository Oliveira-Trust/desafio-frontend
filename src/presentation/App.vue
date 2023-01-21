<template>
  <div id="app">  
    <v-app>
      <the-header-component />
      <v-main>
        <v-container>
          <router-view/>    
        </v-container>
      </v-main>
      <the-footer-component />   
    </v-app>
  </div>
</template>

<script>
import TheFooterComponent from './components/layout/TheFooterComponent.vue'
import TheHeaderComponent from './components/layout/TheHeaderComponent.vue'
import 'vuetify/dist/vuetify.min.css'
import './styles/main.scss'

export default {
  components: { TheHeaderComponent, TheFooterComponent },
  name: 'App',
}
</script>
