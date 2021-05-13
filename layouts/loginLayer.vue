<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <nuxt-link to="/" class="hidden-sm-and-down"
        ><img class="mr-3" src="/Logotipo-OT-white.png" height="40"
      /></nuxt-link>

      <v-spacer></v-spacer>

      <v-btn text class="spacing_more text-none font-weight-light" to="/login">
        <v-icon left dark>mdi-login</v-icon>
        Login
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      title: 'Oliveira Trust',
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  methods: {
    ...mapActions({
      logout: 'authuser/logout',
    }),
    async dologout() {
      await this.logout()
      this.$router.push('/login')
    },
  },
}
</script>
