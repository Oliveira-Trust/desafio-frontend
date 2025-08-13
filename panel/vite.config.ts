import { defineConfig } from 'vite'

export default defineConfig({
  envDir: '.',
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false
  }
})
