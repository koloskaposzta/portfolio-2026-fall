<script setup lang="ts">
import { z } from 'zod'
import { analyticsEvents, trackAnalyticsEvent } from '~/config/analytics'

const figureSchema = z.object({
  src: z.string().startsWith('/api/booda-bike/images/'),
  mobileSrc: z.string().startsWith('/api/booda-bike/images/').optional(),
  alt: z.string(),
  caption: z.string(),
  label: z.string().optional(),
  takeaway: z.string().optional()
})

const flowSchema = z.object({
  label: z.string(),
  steps: z.array(z.object({ title: z.string(), detail: z.string() })),
  caption: z.string()
})

const comparisonSideSchema = z.object({
  label: z.string(),
  title: z.string(),
  details: z.array(z.string()),
  sample: z.object({ tag: z.string().optional(), title: z.string(), description: z.string().optional() }),
  placement: z.string()
})

const studySchema = z.object({
  title: z.string(),
  category: z.string(),
  summary: z.string(),
  context: z.string(),
  contribution: z.string(),
  stack: z.string(),
  cover: figureSchema,
  sections: z.array(z.object({
    id: z.string(),
    title: z.string(),
    paragraphs: z.array(z.string()),
    flow: flowSchema.optional(),
    system: z.object({
      paths: z.array(z.object({ label: z.string(), steps: z.array(z.string()) })),
      caption: z.string()
    }).optional(),
    walkthrough: z.object({
      label: z.string(),
      frames: z.array(z.object({ title: z.string(), description: z.string(), src: z.string().startsWith('/api/booda-bike/images/'), mobileSrc: z.string().startsWith('/api/booda-bike/images/'), alt: z.string() })).min(2),
      caption: z.string()
    }).optional(),
    evidence: z.array(z.object({ label: z.string(), detail: z.string() })).optional(),
    comparison: z.object({
      before: comparisonSideSchema,
      after: comparisonSideSchema,
      caption: z.string()
    }).optional(),
    figures: z.array(figureSchema).optional()
  }))
})

type BoodaBikeStudy = z.infer<typeof studySchema>
type PageState = 'loading' | 'locked' | 'ready' | 'error'

const study = shallowRef<BoodaBikeStudy | null>(null)
const pageState = ref<PageState>('loading')
const password = ref('')
const errorMessage = ref('')
const isSubmitting = ref(false)
const activeFrame = ref(0)
const articleBody = ref<HTMLElement | null>(null)
const resetReadingMidpoint = useCaseStudyMidpoint(articleBody)
const tocSections = computed(() => study.value?.sections.map(section => ({ id: section.id, title: section.title })) ?? [])

watch(pageState, status => {
  if (status === 'ready') {
    void resetReadingMidpoint()
  }
})

const toggleFrame = (): void => {
  activeFrame.value = activeFrame.value === 0 ? 1 : 0
  if (activeFrame.value === 1) {
    trackAnalyticsEvent(analyticsEvents.caseStudyWalkthrough)
  }
}

useSeoMeta({
  title: 'Booda Bike Help Center — Kolos Káposzta',
  description: 'A password-protected product design case study.',
  robots: 'noindex, nofollow, noarchive'
})

const loadStudy = async (): Promise<void> => {
  const response = await fetch('/api/booda-bike/study', { credentials: 'same-origin' })

  if (response.status === 401) {
    pageState.value = 'locked'
    return
  }

  if (!response.ok) {
    throw new Error(`Could not load the case study (HTTP ${response.status}). Please contact Kolos for access.`)
  }

  const result = studySchema.safeParse(await response.json())

  if (!result.success) {
    throw new Error('The case study response did not match its expected structure.')
  }

  study.value = result.data
  pageState.value = 'ready'
}

const unlockStudy = async (): Promise<void> => {
  isSubmitting.value = true
  errorMessage.value = ''

  try {
    const response = await fetch('/api/booda-bike/session', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ password: password.value })
    })

    if (response.status === 401) {
      errorMessage.value = 'That password did not match. Please try again.'
      return
    }

    if (!response.ok) {
      throw new Error(`Could not unlock the case study (HTTP ${response.status}). Please contact Kolos for access.`)
    }

    password.value = ''
    await loadStudy()
    trackAnalyticsEvent(analyticsEvents.caseStudyUnlocked)
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : String(error)
  } finally {
    isSubmitting.value = false
  }
}

onMounted(async () => {
  try {
    await loadStudy()
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : String(error)
    pageState.value = 'error'
  }
})
</script>

<template>
  <main id="main" class="booda-case page-frame">
    <div class="case-breadcrumb type-caption">
      <NuxtLink to="/#work"><AppIcon name="arrow-back" /> All work</NuxtLink>
      <span>/</span>
      <span>Booda Bike Help Center</span>
    </div>

    <div v-if="pageState === 'loading'" class="booda-case__gate" role="status">
      <p class="eyebrow type-meta">Private case study</p>
      <p class="type-body">Checking access…</p>
    </div>

    <section v-else-if="pageState === 'locked'" class="booda-case__gate" aria-labelledby="booda-gate-title">
      <p class="eyebrow type-meta">Private case study / UI &amp; UX</p>
      <h1 id="booda-gate-title" class="type-section-title">Booda Bike Help Center<span class="period">.</span></h1>
      <p class="type-body-lg">This case study is available with a password.</p>
      <form class="booda-case__form" @submit.prevent="unlockStudy">
        <label class="type-label" for="booda-password">Password</label>
        <div class="booda-case__form-row">
          <input id="booda-password" v-model="password" type="password" autocomplete="current-password" required>
          <button class="action-link action-link--primary type-nav" type="submit" :disabled="isSubmitting">{{ isSubmitting ? 'Opening…' : 'Open case study' }}</button>
        </div>
        <p v-if="errorMessage" class="booda-case__error type-body-sm" role="alert">{{ errorMessage }}</p>
      </form>
      <p class="type-body-sm">Don't have the password? <a class="text-link type-link" href="mailto:kap.kolos@gmail.com?subject=Booda%20Bike%20case%20study%20access" :data-umami-event="analyticsEvents.caseStudyAccessRequest">Request access by email <AppIcon name="north-east" /></a></p>
    </section>

    <section v-else-if="pageState === 'error'" class="booda-case__gate" aria-labelledby="booda-error-title">
      <h1 id="booda-error-title" class="type-heading-md">The case study could not load.</h1>
      <p class="type-body">{{ errorMessage }}</p>
    </section>

    <div v-else-if="study" class="booda-case__layout case-document">
      <article ref="articleBody" class="booda-case__article case-document__main">
      <header class="case-hero">
        <p class="eyebrow type-meta">Case study / {{ study.category }}</p>
        <h1 class="type-case-title">Booda Bike<span class="period">.</span></h1>
        <p class="booda-case__subtitle type-heading-md">Help Center</p>
        <p class="case-lead type-lead">{{ study.summary }}</p>
      </header>

      <figure class="case-cover">
        <picture>
          <source v-if="study.cover.mobileSrc" :srcset="study.cover.mobileSrc" media="(max-width: 620px)">
          <img :src="study.cover.src" :alt="study.cover.alt">
        </picture>
        <figcaption class="type-caption">{{ study.cover.caption }} <a :href="study.cover.src" :class="{ 'booda-case__full-size--desktop': study.cover.mobileSrc }" :aria-label="`View full-size image: ${study.cover.alt} (opens in a new tab)`" target="_blank" rel="noopener noreferrer">View full size</a><a v-if="study.cover.mobileSrc" class="booda-case__full-size--mobile" :href="study.cover.mobileSrc" :aria-label="`View full-size mobile image: ${study.cover.alt} (opens in a new tab)`" target="_blank" rel="noopener noreferrer">View full size</a></figcaption>
      </figure>

      <dl class="case-meta">
        <div><dt class="type-label">Context</dt><dd class="type-body-sm">{{ study.context }}</dd></div>
        <div><dt class="type-label">My contribution</dt><dd class="type-body-sm">{{ study.contribution }}</dd></div>
        <div><dt class="type-label">Production stack</dt><dd class="type-body-sm">{{ study.stack }}</dd></div>
      </dl>

      <section v-for="section in study.sections" :id="section.id" :key="section.id" class="case-section" :aria-labelledby="`${section.id}-title`">
        <div class="case-section__content">
          <h2 :id="`${section.id}-title`" class="type-heading-md">{{ section.title }}</h2>
          <p v-for="paragraph in section.paragraphs" :key="paragraph" class="type-body">{{ paragraph }}</p>
          <div v-if="section.flow" class="booda-case__flow">
            <ol :aria-label="section.flow.label">
              <li v-for="step in section.flow.steps" :key="step.title">
                <strong class="type-label">{{ step.title }}</strong>
                <p class="type-body-sm">{{ step.detail }}</p>
              </li>
            </ol>
            <p class="type-caption">{{ section.flow.caption }}</p>
          </div>
          <div v-if="section.system" class="booda-case__system" aria-label="Production system map">
            <div v-for="path in section.system.paths" :key="path.label" class="booda-case__system-row">
              <h3 class="type-label">{{ path.label }}</h3>
              <ol :aria-label="path.label">
                <li v-for="step in path.steps" :key="step" class="type-body-sm">{{ step }}</li>
              </ol>
            </div>
            <p class="type-caption">{{ section.system.caption }}</p>
          </div>
          <div v-if="section.walkthrough" class="booda-case__walkthrough">
            <div class="booda-case__walkthrough-head">
              <span class="type-label">{{ section.walkthrough.label }}</span>
              <span class="booda-case__walkthrough-instruction" aria-live="polite">{{ section.walkthrough.frames[activeFrame]!.title }} · {{ activeFrame === 0 ? 'Click or tap the image to select' : 'Click or tap the image to go back' }}</span>
            </div>
            <figure>
              <button type="button" class="booda-case__walkthrough-trigger" data-testid="booda-walkthrough-toggle" :data-cursor-action="activeFrame === 0 ? 'Select' : 'Back'" :aria-label="activeFrame === 0 ? 'Select Return a product to see the relevant guidance and form' : 'Back to the initial contact form'" @click="toggleFrame">
                <picture v-for="(frame, index) in section.walkthrough.frames" v-show="activeFrame === index" :key="frame.src">
                  <source :srcset="frame.mobileSrc" media="(max-width: 620px)">
                  <img :src="frame.src" :alt="frame.alt" loading="eager">
                </picture>
              </button>
              <figcaption class="type-caption">{{ section.walkthrough.frames[activeFrame]!.description }} <a class="booda-case__full-size--desktop" :href="section.walkthrough.frames[activeFrame]!.src" :aria-label="`View full-size image: ${section.walkthrough.frames[activeFrame]!.alt} (opens in a new tab)`" target="_blank" rel="noopener noreferrer">View full size</a><a class="booda-case__full-size--mobile" :href="section.walkthrough.frames[activeFrame]!.mobileSrc" :aria-label="`View full-size mobile image: ${section.walkthrough.frames[activeFrame]!.alt} (opens in a new tab)`" target="_blank" rel="noopener noreferrer">View full size</a></figcaption>
            </figure>
            <p class="type-caption">{{ section.walkthrough.caption }}</p>
          </div>
          <div v-if="section.comparison" class="booda-case__comparison">
            <p class="booda-case__comparison-label type-caption">Source-based reconstruction / one selector card</p>
            <div v-for="side in [section.comparison.before, section.comparison.after]" :key="side.label">
              <span class="type-label">{{ side.label }}</span>
              <h3 class="type-heading-sm">{{ side.title }}</h3>
              <div class="booda-case__sample" aria-label="Source-based selector card reconstruction">
                <span v-if="side.sample.tag" class="type-caption">{{ side.sample.tag }}</span>
                <strong class="type-body-sm">{{ side.sample.title }}</strong>
                <span v-if="side.sample.description" class="type-caption">{{ side.sample.description }}</span>
              </div>
              <p class="booda-case__placement type-caption">{{ side.placement }}</p>
              <ul class="type-body-sm">
                <li v-for="detail in side.details" :key="detail">{{ detail }}</li>
              </ul>
            </div>
            <p class="type-caption">{{ section.comparison.caption }}</p>
          </div>
          <div v-if="section.evidence" class="booda-case__evidence">
            <div v-for="item in section.evidence" :key="item.label">
              <h3 class="type-label">{{ item.label }}</h3>
              <p class="type-body-sm">{{ item.detail }}</p>
            </div>
          </div>
          <figure v-for="figure in section.figures" :key="figure.src" class="case-figure">
            <div v-if="figure.label && figure.takeaway" class="booda-case__figure-intro">
              <span class="type-label">{{ figure.label }}</span>
              <h3 class="type-heading-sm">{{ figure.takeaway }}</h3>
            </div>
            <p v-if="!figure.mobileSrc" class="booda-case__image-hint type-caption">Swipe to inspect the screenshot, or open it full size.</p>
            <div class="booda-case__image-viewport" :class="{ 'booda-case__image-viewport--mobile': figure.mobileSrc }">
              <picture>
                <source v-if="figure.mobileSrc" :srcset="figure.mobileSrc" media="(max-width: 620px)">
                <img :src="figure.src" :alt="figure.alt" loading="lazy">
              </picture>
            </div>
            <figcaption class="type-caption">{{ figure.caption }} <a :href="figure.src" :class="{ 'booda-case__full-size--desktop': figure.mobileSrc }" :aria-label="`View full-size image: ${figure.alt} (opens in a new tab)`" target="_blank" rel="noopener noreferrer">View full size</a><a v-if="figure.mobileSrc" class="booda-case__full-size--mobile" :href="figure.mobileSrc" :aria-label="`View full-size mobile image: ${figure.alt} (opens in a new tab)`" target="_blank" rel="noopener noreferrer">View full size</a></figcaption>
          </figure>
        </div>
      </section>

      <div class="case-actions">
        <a class="action-link type-nav" href="https://help.boodabike.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit the live Help Center (opens in a new tab)" :data-umami-event="analyticsEvents.externalProjectClick">Visit the live Help Center <AppIcon name="north-east" /></a>
      </div>
      </article>
      <CaseStudyToc :sections="tocSections" />
    </div>
  </main>
</template>

<style scoped>
.booda-case {
  min-height: 70vh;
  padding-bottom: clamp(5rem, 10vw, 10rem);
}

.booda-case__gate {
  max-width: 48rem;
  margin-inline: auto;
  padding-block: clamp(6rem, 10vw, 11rem);
}

.booda-case__gate h1 {
  margin: 1rem 0 1.5rem;
  overflow-wrap: anywhere;
}

.booda-case__gate > p {
  max-width: 35rem;
}

.booda-case__form {
  margin-top: 3rem;
}

.booda-case__form label {
  display: block;
  margin-bottom: 0.7rem;
}

.booda-case__form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.booda-case__form input {
  min-width: min(100%, 18rem);
  min-height: 3.3rem;
  padding: 0.85rem 1rem;
  border: 1px solid var(--ink);
  border-radius: 0;
  font: inherit;
}

.booda-case__form input:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

.booda-case__form button {
  cursor: pointer;
}

.booda-case__form button:disabled {
  opacity: 0.6;
  cursor: wait;
}

.booda-case__error {
  color: #a32020;
}

.booda-case__subtitle {
  margin: -0.5rem 0 2rem;
}

.booda-case .case-hero {
  padding-block: clamp(3rem, 5vw, 5rem) clamp(2rem, 3vw, 3rem);
}

.booda-case__article {
  max-width: 48rem;
}

.booda-case .case-breadcrumb {
  max-width: 48rem;
  margin-inline: auto;
}

.booda-case .case-cover,
.booda-case .case-figure,
.booda-case__walkthrough {
  max-width: 48rem;
}

.booda-case .case-meta {
  max-width: 68rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 0 0 2.5rem;
}

.booda-case .case-meta dt {
  color: var(--muted);
}

.booda-case .case-meta dd {
  max-width: 20rem;
  margin: 0.55rem 0 0;
}

.booda-case .case-breadcrumb a {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
}

.booda-case .case-section__content {
  max-width: 82rem;
}

.booda-case__flow,
.booda-case__comparison,
.booda-case__system,
.booda-case__walkthrough,
.booda-case__evidence {
  margin-block: 2rem;
}

.booda-case__figure-intro {
  display: grid;
  grid-template-columns: 11rem minmax(0, 1fr);
  gap: 1.5rem;
  align-items: start;
  margin: 3rem 0 1rem;
  padding-top: 1.2rem;
  border-top: 1px solid var(--line);
}

.booda-case__figure-intro h3 {
  max-width: 42rem;
  margin: 0;
  font-weight: inherit;
}

.booda-case__image-viewport {
  overflow-x: auto;
}

.booda-case__image-hint {
  display: none;
  font-size: 1rem;
}

.booda-case__flow ol,
.booda-case__comparison {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  padding: 0;
  border-block: 1px solid var(--line);
}

.booda-case__flow ol {
  margin: 0;
  list-style: none;
}

.booda-case__flow li {
  min-width: 0;
  padding: 1.25rem;
  border-right: 1px solid var(--line);
}

.booda-case__flow li:last-child {
  border-right: 0;
}

.booda-case__flow li p {
  max-width: none;
  margin: 0.7rem 0 0;
}

.booda-case__flow > p,
.booda-case__comparison > p {
  max-width: none;
  margin: 0.8rem 0 0;
}

.booda-case__comparison {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 2rem;
}

.booda-case__comparison-label {
  grid-column: 1 / -1;
  padding-top: 0.8rem;
}

.booda-case__comparison > div {
  min-width: 0;
  padding: 1.25rem 0;
}

.booda-case__comparison > div:first-child {
  border-right: 1px solid var(--line);
}

.booda-case__comparison h3 {
  margin: 0.7rem 0;
}

.booda-case__comparison ul {
  padding-left: 1.2rem;
  margin: 0;
}

.booda-case__comparison li + li {
  margin-top: 0.45rem;
}

.booda-case__sample {
  display: flex;
  width: min(100%, 20rem);
  min-height: 8rem;
  flex-direction: column;
  justify-content: center;
  gap: 0.35rem;
  margin: 1.2rem 0;
  padding: 1.2rem;
  border: 1px solid var(--line);
  background: var(--paper);
}

.booda-case__sample strong {
  color: var(--ink);
}

.booda-case__placement {
  width: fit-content;
  padding-bottom: 0.7rem;
  border-bottom: 1px solid var(--line);
}

.booda-case__system {
  padding-block: 0.5rem;
  border-block: 1px solid var(--line);
}

.booda-case__system-row {
  display: grid;
  grid-template-columns: 11rem minmax(0, 1fr);
  gap: 1.5rem;
  align-items: center;
  padding-block: 1rem;
}

.booda-case__system-row + .booda-case__system-row {
  border-top: 1px solid var(--line);
}

.booda-case__system-row h3 {
  margin: 0;
}

.booda-case__system-row ol {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.4rem;
  padding: 0;
  margin: 0;
  list-style: none;
}

.booda-case__system-row li {
  position: relative;
  padding: 0.85rem 0.7rem;
  border: 1px solid var(--line);
  text-align: center;
}

.booda-case__system > p {
  max-width: none;
  margin-top: 0.7rem;
}

.booda-case__walkthrough {
  border: 1px solid var(--line);
}

.booda-case__walkthrough-head {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid var(--line);
}

.booda-case__walkthrough-instruction {
  font-size: 1rem;
  line-height: 1.4;
}

.booda-case__walkthrough-trigger {
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.booda-case__walkthrough-trigger picture {
  display: block;
}

.booda-case__walkthrough-trigger:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: -3px;
}

.booda-case__walkthrough figure {
  margin: 0;
}

.booda-case__walkthrough img {
  display: block;
  width: 100%;
  height: auto;
}

.booda-case__walkthrough figcaption,
.booda-case__walkthrough > p {
  margin: 0;
  padding: 0.8rem 1rem;
}

.booda-case__walkthrough > p {
  border-top: 1px solid var(--line);
}

.booda-case__evidence {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-block: 1px solid var(--line);
}

.booda-case__evidence > div {
  padding: 1.2rem;
  border-right: 1px solid var(--line);
}

.booda-case__evidence > div:last-child {
  border-right: 0;
}

.booda-case__evidence p {
  margin: 0.75rem 0 0;
}

.booda-case__evidence h3 {
  margin: 0;
}

.booda-case__comparison > p {
  grid-column: 1 / -1;
}

.booda-case figcaption a {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  margin-left: 0.4rem;
  padding-inline: 0.3rem;
  color: var(--ink);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.booda-case figcaption,
.booda-case__walkthrough > p {
  font-size: 0.875rem;
}

.booda-case figcaption .booda-case__full-size--mobile {
  display: none;
}

.booda-case .case-cover img,
.booda-case .case-figure img,
.booda-case__walkthrough img {
  max-height: 28rem;
  object-fit: cover;
  object-position: center top;
  border: 1px solid var(--line);
  background: var(--paper);
}

@media (max-width: 900px) {
  .booda-case .case-meta {
    grid-template-columns: 1fr;
  }

  .booda-case__flow ol {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .booda-case__flow li:nth-child(2) {
    border-right: 0;
  }

  .booda-case__flow li:nth-child(-n + 2) {
    border-bottom: 1px solid var(--line);
  }

  .booda-case__system-row {
    grid-template-columns: 1fr;
    gap: 0.7rem;
  }
}

@media (max-width: 620px) {
  .booda-case figcaption .booda-case__full-size--desktop {
    display: none;
  }

  .booda-case figcaption .booda-case__full-size--mobile {
    display: inline-flex;
  }

  .booda-case .case-cover img,
  .booda-case .case-figure img,
  .booda-case__walkthrough img {
    max-height: 26rem;
  }

  .booda-case .case-cover {
    max-width: 15rem;
    margin-inline: auto;
  }

  .booda-case__walkthrough-trigger {
    padding-block: 1rem;
    background: #f7f7f7;
  }

  .booda-case__walkthrough-trigger picture,
  .booda-case__image-viewport--mobile picture {
    display: block;
    max-width: 15rem;
    margin-inline: auto;
  }

  .booda-case__image-hint {
    display: block;
    margin: 0 0 0.5rem;
  }

  .booda-case__form-row > * {
    width: 100%;
  }

  .booda-case__flow ol,
  .booda-case__comparison {
    grid-template-columns: 1fr;
  }

  .booda-case__flow li {
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }

  .booda-case__flow li:last-child {
    border-bottom: 0;
  }

  .booda-case__comparison > div:first-child {
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }

  .booda-case__figure-intro {
    grid-template-columns: 1fr;
    gap: 0.7rem;
  }

  .booda-case__system-row ol,
  .booda-case__evidence {
    grid-template-columns: 1fr;
  }

  .booda-case__evidence > div {
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }

  .booda-case__evidence > div:last-child {
    border-bottom: 0;
  }

  .booda-case__image-viewport img {
    width: 48rem;
    max-width: none;
  }

  .booda-case__image-viewport--mobile img {
    width: 100%;
    max-width: 100%;
  }
}
</style>
