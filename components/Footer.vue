<template>
  <v-container fluid class="mt-6 px-1">
    <!-- <v-card class="grey darken-3"> -->
    <v-row class="grey darken-4">
      <v-col class="d-none d-sm-flex d-flex flex-column" cols="12" sm="6">
        <p>
          <img
            src="/Logotipo-OT-white.png"
            class="animRightToLeft"
            height="32"
          />
        </p>
        <p>Copyright © {{ copyYear }} | .....</p>
      </v-col>
      <v-divider class="d-none d-sm-flex" vertical />
      <v-col cols="12" sm="6">
        <v-col class="text-center animLeftToRight">Acompanhe</v-col>
        <v-row>
          <v-col class="d-flex justify-center align-center animLeftToRight">
            <v-btn
              v-for="item in social_icons"
              :key="item.href"
              fab
              light
              small
              class="ml-1"
              :href="item.href"
              target="_blank"
              ><v-icon large :color="item.color">{{ item.icon }}</v-icon></v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <!-- </v-card> -->
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    copyYear: new Date().getFullYear(),
    social_icons: [
      {
        icon: 'mdi-linkedin',
        href: 'https://www.linkedin.com/company/oliveiratrust/',
        color: 'blue lighten-1',
      },
    ],
  }),
  computed: {
    ...mapGetters(['loggedInUser']),
  },
}
</script>

<style lang="scss" scoped>
.animRightToLeft {
  animation: 3s 1 slidein;
}
.animLeftToRight {
  animation: 3s 1 slideout;
}
@keyframes slidein {
  from {
    margin-left: 100%;
  }

  to {
    margin-left: 0%;
  }
}

@keyframes slideout {
  from {
    margin-left: 100%;
    width: 300%;
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
}
</style>
