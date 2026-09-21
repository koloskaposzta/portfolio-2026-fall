export default defineNuxtPlugin((): void => {
  if (import.meta.dev || window.location.hostname !== 'koloskaposzta.com') {
    return
  }

  const { umamiWebsiteId, umamiScriptUrl } = useRuntimeConfig().public

  if (!umamiWebsiteId) {
    return
  }

  const scriptUrl = new URL(umamiScriptUrl)

  if (scriptUrl.protocol !== 'https:') {
    throw new Error(`Umami script URL must use HTTPS: ${umamiScriptUrl}`)
  }

  useHead({
    script: [{
      src: scriptUrl.toString(),
      defer: true,
      'data-website-id': umamiWebsiteId,
      'data-domains': 'koloskaposzta.com',
      'data-exclude-search': 'true',
      'data-exclude-hash': 'true'
    }]
  })
})
