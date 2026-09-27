export default defineNuxtConfig({
  compatibilityDate: '2026-09-16',
  modules: ['botid/nuxt'],
  css: ['~/assets/css/main.css', '~/assets/css/editorial.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [{ name: 'theme-color', content: '#ffffff' }]
    }
  },
  runtimeConfig: {
    resendApiKey: '',
    contactFrom: '',
    contactTo: '',
    public: {
      contactEnabled: false,
      siteUrl: 'https://koloskaposzta.com',
      umamiWebsiteId: '',
      umamiScriptUrl: 'https://cloud.umami.is/script.js'
    }
  },
  nitro: {
    prerender: {
      routes: ['/sitemap.xml', '/llms.txt']
    }
  },
  typescript: {
    strict: true,
    typeCheck: true
  }
})
