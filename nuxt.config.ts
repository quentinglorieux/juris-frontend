export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    '@pinia/nuxt'],
  ssr: false,
  runtimeConfig: {
    apiSecret: '123',
    public: {
      API_BASE_URL: 'https://jurisdirectus.rubidiumweb.eu'
    }
  },
  css: [
    // "primevue/resources/themes/saga-blue/theme.css",
    "assets/styles/theme/saga-blue/theme.css",
    "primevue/resources/primevue.css",
    "primeicons/primeicons.css",
    "~/assets/styles.scss",
  ],
  build: {
    transpile: ["primevue"],
  },

  components: [
    {
      path: "~/components/",
      pathPrefix: false,
    },
  ],

  devtools: {
    enabled: false,
  },
});

