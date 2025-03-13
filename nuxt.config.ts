// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/content'],

  routeRules: {
    // prerender index route by default
    '/': { prerender: true },
  },

  compatibilityDate: '2025-03-13',
});