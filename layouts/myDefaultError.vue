<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <nuxt-link to="/"
        ><img class="mr-3" src="/Logotipo-OT-white.png" height="40"
      /></nuxt-link>

      <v-spacer></v-spacer>
      <div v-if="isAuthenticated">
        <v-btn text class="d-none d-sm-inline text-none">
          {{ loggedInUser.username.replace(/ .*/, '') }}
        </v-btn>
        <v-btn
          text
          class="spacing_more text-none font-weight-light"
          @click.stop="dologout()"
        >
          <v-icon left dark>mdi-exit-to-app</v-icon>
          Exit
        </v-btn>
      </div>
      <div v-else>
        <v-btn
          text
          class="spacing_more text-none font-weight-light"
          to="/login"
        >
          <v-icon left dark>mdi-login</v-icon>
          Login
        </v-btn>
      </div>
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
