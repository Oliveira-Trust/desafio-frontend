export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Desafio Front-End - Oliveira Trust',
    htmlAttrs: {
      lang: 'pt-BR',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Desafio Front-End - Oliveira Trust',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
    // https://google-fonts.nuxtjs.org/setup
    '@nuxtjs/google-fonts',
    // https://github.com/nuxt-community/fontawesome-module
    '@nuxtjs/fontawesome',
    // https://github.com/Developmint/nuxt-purgecss
    'nuxt-purgecss',
  ],

  // Style Resources module configuration: https://github.com/nuxt-community/style-resources-module
  styleResources: {},

  // Google Fonts module configuration: https://google-fonts.nuxtjs.org/setup
  googleFonts: {
    families: {
      Comfortaa: [200, 400, 500, 600, 700, 900],
    },
  },

  // Font Awesome module configuration: https://github.com/nuxt-community/fontawesome-module
  fontawesome: {
    icons: {
      regular: ['faEnvelope', 'faTrashAlt', 'faUser'],
      solid: ['faCog', 'faUpload', 'faUser']
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
