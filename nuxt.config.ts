// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    baseURL: '/colour-generator/',
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          // Disable eval usage in the code
          format: 'es'
        }
      }
    }
  },
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"]
})