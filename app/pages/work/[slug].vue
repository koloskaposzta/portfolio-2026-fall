<script setup lang="ts">
import { analyticsEvents } from '~/config/analytics'
import { caseStudies, getNextCaseStudy } from '~/data/caseStudies'

type UmamiWindow = Window & {
  umami?: { track: (eventName: string) => void }
}

const route = useRoute()
const articleBody = ref<HTMLElement | null>(null)
const midpointTracked = ref(false)

const study = computed(() => {
  const match = caseStudies.find(item => item.slug === route.params.slug)

  if (!match) {
    throw createError({ statusCode: 404, statusMessage: 'Case study not found' })
  }

  return match
})

const nextStudy = computed(() => getNextCaseStudy(study.value.slug))

useSeoMeta({
  title: () => `${study.value.title} — Kolos Káposzta`,
  description: () => study.value.summary
})

const trackReadingMidpoint = (): void => {
  const body = articleBody.value

  if (!body || midpointTracked.value) {
    return
  }

  const bodyTop = window.scrollY + body.getBoundingClientRect().top
  const midpoint = bodyTop + body.offsetHeight / 2

  if (window.scrollY < midpoint) {
    return
  }

  const tracker = (window as UmamiWindow).umami

  if (!tracker) {
    return
  }

  tracker.track(analyticsEvents.caseStudy50)
  midpointTracked.value = true
}

onMounted(() => {
  window.addEventListener('scroll', trackReadingMidpoint, { passive: true })
  window.addEventListener('resize', trackReadingMidpoint)
  trackReadingMidpoint()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', trackReadingMidpoint)
  window.removeEventListener('resize', trackReadingMidpoint)
})

watch(() => route.params.slug, async () => {
  midpointTracked.value = false
  await nextTick()
  window.requestAnimationFrame(trackReadingMidpoint)
})
</script>

<template>
  <main id="main" class="case-study page-frame">
    <div class="case-breadcrumb type-caption">
      <NuxtLink to="/#work">← All work</NuxtLink>
      <span>/</span>
      <span>{{ study.title }}</span>
    </div>

    <header class="case-hero">
      <p class="eyebrow type-meta">Case study / {{ study.category }}</p>
      <h1 class="type-case-title">{{ study.title }}<span class="period">.</span></h1>
      <p class="case-lead type-lead">{{ study.summary }}</p>
      <div class="case-meta">
        <div><span class="type-label">Context</span><p class="type-body-sm">{{ study.context }}</p></div>
        <div><span class="type-label">My contribution</span><p class="type-body-sm">{{ study.contribution }}</p></div>
      </div>
    </header>

    <figure class="case-cover">
      <img :src="study.cover.src" :alt="study.cover.alt">
      <figcaption class="type-caption">{{ study.cover.caption }}</figcaption>
    </figure>

    <div ref="articleBody" class="case-body">
      <section v-for="(section, index) in study.sections" :id="section.id" :key="section.id" class="case-section" :aria-labelledby="`${section.id}-title`">
        <div class="case-section__index type-label">0{{ index + 1 }}</div>
        <div class="case-section__content">
          <h2 :id="`${section.id}-title`" class="type-section-title">{{ section.title }}</h2>
          <template v-for="(block, blockIndex) in section.blocks" :key="blockIndex">
            <p v-if="block.kind === 'paragraph'" class="type-body">{{ block.text }}</p>
            <h3 v-else-if="block.kind === 'heading'" class="type-heading-md">{{ block.text }}</h3>
            <h4 v-else-if="block.kind === 'subheading'" class="type-heading-sm">{{ block.text }}</h4>
            <ul v-else-if="block.kind === 'list'" class="case-points type-body">
              <li v-for="item in block.items" :key="item">{{ item }}</li>
            </ul>
            <blockquote v-else-if="block.kind === 'quote'" class="type-quote">{{ block.text }}</blockquote>
            <p v-else-if="block.kind === 'link'" class="type-body"><a :href="block.href" target="_blank" rel="noopener noreferrer" :data-umami-event="analyticsEvents.externalProjectClick">{{ block.text }}</a></p>
          </template>
          <figure v-if="section.figure" class="case-figure">
            <img :src="section.figure.src" :alt="section.figure.alt" loading="lazy">
            <figcaption class="type-caption">{{ section.figure.caption }}</figcaption>
          </figure>
        </div>
      </section>
    </div>

    <div class="case-actions">
      <a v-if="study.liveUrl" class="action-link action-link--primary type-nav" :href="study.liveUrl" target="_blank" rel="noopener noreferrer" :data-umami-event="analyticsEvents.externalProjectClick">Try the live demo <span aria-hidden="true">↗</span></a>
      <a class="action-link type-nav" :href="study.sourceUrl" target="_blank" rel="noopener noreferrer">Read the original case study <span aria-hidden="true">↗</span></a>
    </div>

    <NuxtLink class="next-project" :to="`/work/${nextStudy.slug}`" :data-umami-event="analyticsEvents.caseStudyNext">
      <span class="eyebrow type-meta">Next case study</span>
      <span class="next-project__title type-next-title">{{ nextStudy.title }} <span aria-hidden="true">↗</span></span>
    </NuxtLink>
  </main>
</template>
