import colors from 'vuetify/es5/util/colors'
import pt from 'vuetify/es5/locale/pt'
export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'Oliveira Trusts',

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Oliveira Trusts - LEARN, THINK, SPEAK LIKE A NATIVE',
      },
      {
        hid: 'robots',
        name: 'robots',
        content: 'index,follow',
      },
    ],
    // link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    // link: [{ rel: 'icon', type: 'image/jpg', href: '/favicon.jpg' }],
    link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
  },
  // server: {
  //   port: 3000, // default: 3000
  //   host: '0.0.0.0', // default: localhost,
  //   timing: false,
  // },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/axios' },
    { src: '~/plugins/persistedState.js' },
    {
      src: '~/plugins/vuelidate.js',
    },
    { src: '~plugins/vue-cookie', ssr: false, injectAs: 'cookie' },
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'vuetify-dialog/nuxt',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  // axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'pt-br',
      name: 'Oliveira Trusts',
      short_name: '',
      description: 'Oliveira Trusts',
    },
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    lang: {
      locales: { pt },
      current: 'pt',
    },
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // auth

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      vue: {
        transformAssetUrls: {
          'v-img': 'src',
        },
      },
    },
  },
}
