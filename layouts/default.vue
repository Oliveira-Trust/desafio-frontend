<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <nuxt-link to="/"
        ><img class="mr-3" src="/Logotipo-OT-white.png" height="32"
      /></nuxt-link>
      <v-divider vertical />

      <!-- dropdown menu -->
      <v-menu offset-y>
        <template #activator="{ on }">
          <v-btn text v-on="on">
            <span id="more-space4" class="font-weight-light text-none"
              >Menu</span
            >
            <v-icon right>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="link in links"
            :key="link.text"
            router
            :to="link.route"
          >
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-spacer></v-spacer>
      <div v-if="isAuthenticated">
        <v-btn
          text
          class="d-none d-sm-inline text-none"
          style="cursor: default"
        >
          <v-icon left dark>mdi-account</v-icon>
          {{ loggedInUser.username.replace(/ .*/, '') }}
        </v-btn>
        <v-btn
          id="more-space2"
          text
          class="text-none font-weight-light"
          @click.stop="dologout()"
        >
          <v-icon left dark>mdi-exit-to-app</v-icon>
          Exit
        </v-btn>
      </div>
      <div v-else>
        <v-btn
          id="more-space3"
          text
          class="text-none font-weight-light"
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
        <Footer />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      showLGPD: false,
      clipped: false,
      drawer: false,
      fixed: false,
      links: [
        { icon: 'home', text: 'Home', route: '/' },
        { icon: 'contacts', text: 'About', route: '/' },
      ],
      miniVariant: false,
      title: 'Oliveira Trust',
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  mounted() {
    const vm = this
    vm.showLGPD = !this.$cookies.get('justinmentor_lgpd')
  },
  methods: {
    ...mapActions({
      logout: 'authuser/logout',
    }),
    async dologout() {
      const res = await this.$dialog.confirm({
        text: `Exit from app?`,
        title: 'Confirm',
        type: 'error',
        actions: {
          false: 'No',
          true: {
            text: 'Yes',
            color: 'primary',
          },
        },
      })
      if (!res) return false
      await this.logout()
      this.$router.push('/login')
    },
  },
}
</script>
<style scoped>
#more-space1,
#more-space2,
#more-space3,
#more-space4 {
  letter-spacing: 3px;
}
</style>
