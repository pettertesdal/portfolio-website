// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/content'],

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }
      ]
    }
  },

  nitro: {
    routeRules: {
      "/api/**": {
        cors: true,
      },
    },
  },

  routeRules: {
    // prerender index route by default
    '/': { prerender: true },
  },
  css: ["@/assets/style.css"], // ✅ Correct way to include CSS in Nuxt

  compatibilityDate: '2025-03-13',
});
