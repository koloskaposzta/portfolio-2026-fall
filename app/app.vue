<script setup lang="ts">
import { analyticsEvents } from '~/config/analytics'

const headerHidden = ref(false)
const headerScrolled = ref(false)
const route = useRoute()
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl.replace(/\/$/, '')
const canonicalUrl = computed(() => `${siteUrl}${route.path === '/' ? '' : route.path}`)

useSeoMeta({
  titleTemplate: title => title ? `${title}` : 'Kolos Káposzta — Product designer',
  ogSiteName: 'Kolos Káposzta',
  ogType: 'website',
  ogLocale: 'en_US',
  ogUrl: () => canonicalUrl.value,
  twitterCard: 'summary_large_image',
  twitterTitle: 'Kolos Káposzta — Product designer',
  twitterDescription: 'Selected product design work by Kolos Káposzta, a designer with a front-end development background.',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
})

useHead({
  link: [{ rel: 'canonical', href: () => canonicalUrl.value }],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': `${siteUrl}/#person`,
          name: 'Kolos Káposzta',
          url: siteUrl,
          jobTitle: 'Product designer and front-end developer',
          sameAs: [
            'https://github.com/koloskaposzta',
            'https://www.linkedin.com/in/kolos-k%C3%A1poszta-04891421a/'
          ],
          alumniOf: {
            '@type': 'EducationalOrganization',
            name: 'MOME Open'
          }
        },
        {
          '@type': 'WebSite',
          '@id': `${siteUrl}/#website`,
          url: siteUrl,
          name: 'Kolos Káposzta — Product designer',
          inLanguage: 'en',
          author: { '@id': `${siteUrl}/#person` }
        }
      ]
    })
  }]
})

onMounted(() => {
  const mobile = window.matchMedia('(max-width: 620px)')
  let previousY = window.scrollY
  let directionStart = previousY
  let previousDirection = 0

  const updateHeader = (): void => {
    const currentY = Math.max(0, Math.min(window.scrollY, document.documentElement.scrollHeight - window.innerHeight))
    const direction = Math.sign(currentY - previousY)
    headerScrolled.value = currentY > 8

    if (direction !== 0 && direction !== previousDirection) {
      directionStart = previousY
      previousDirection = direction
    }

    if (!mobile.matches || currentY <= 96) {
      headerHidden.value = false
      directionStart = currentY
    } else if (Math.abs(currentY - directionStart) >= 24) {
      headerHidden.value = direction > 0
    }

    previousY = currentY
  }

  window.addEventListener('scroll', updateHeader, { passive: true })
  mobile.addEventListener('change', updateHeader)
  updateHeader()

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', updateHeader)
    mobile.removeEventListener('change', updateHeader)
  })
})

watch(() => route.fullPath, () => {
  headerHidden.value = false
})

if (import.meta.dev) {
  useHead({ script: [{ src: 'https://mcp.figma.com/mcp/html-to-design/capture.js', async: true }] })
}
</script>

<template>
  <NuxtRouteAnnouncer />
  <SignatureCursor />
  <a class="skip-link" href="#main">Skip to content</a>

  <header class="site-header" :class="{ 'site-header--hidden': headerHidden, 'site-header--scrolled': headerScrolled }" @focusin="headerHidden = false">
    <NuxtLink class="site-logo type-brand" to="/" aria-label="Kolos Káposzta — home"><BrandWordmark variant="header" /></NuxtLink>
    <nav class="site-nav type-nav" aria-label="Main navigation">
      <NuxtLink to="/#work">Work</NuxtLink>
      <NuxtLink to="/about">About</NuxtLink>
      <NuxtLink class="site-nav__contact" to="/#contact" :data-umami-event="analyticsEvents.contactClick">Contact <span aria-hidden="true">↗</span></NuxtLink>
    </nav>
  </header>

  <NuxtPage />

  <footer class="site-footer page-frame">
    <div v-if="route.path !== '/'">
      <p class="eyebrow type-meta">Have something in mind?</p>
      <NuxtLink class="footer-contact type-footer-title" to="/#contact" :data-umami-event="analyticsEvents.contactClick">Let’s talk <span aria-hidden="true">↗</span></NuxtLink>
    </div>
    <div class="footer-bottom type-caption">
      <span>© {{ new Date().getFullYear() }} Kolos Káposzta</span>
      <div class="footer-links type-nav">
        <a href="https://github.com/koloskaposzta" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
        <a href="https://www.linkedin.com/in/kolos-k%C3%A1poszta-04891421a/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
      </div>
    </div>
  </footer>
</template>
