export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
  ssr: false,
  runtimeConfig: {
    // The private keys which are only available within server-side
    apiSecret: '123',
    // Keys within public, will be also exposed to the client-side
    public: {
      API_BASE_URL: process.env.API_BASE_URL
    }
  },
  css: [
    "primevue/resources/themes/saga-blue/theme.css",
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

