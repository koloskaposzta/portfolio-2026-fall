export default defineNuxtConfig({
  compatibilityDate: '2026-09-16',
  css: ['~/assets/css/main.css', '~/assets/css/editorial.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [{ name: 'theme-color', content: '#ffffff' }]
    }
  },
  runtimeConfig: {
    public: {
      umamiWebsiteId: '',
      umamiScriptUrl: 'https://cloud.umami.is/script.js'
    }
  },
  typescript: {
    strict: true,
    typeCheck: true
  }
})
