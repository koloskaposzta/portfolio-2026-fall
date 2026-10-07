<script setup lang="ts">
import { z } from 'zod'

const figureSchema = z.object({
  src: z.string().startsWith('/api/i4p-rdss/images/'),
  alt: z.string(),
  caption: z.string(),
  label: z.string().optional()
})

const studySchema = z.object({
  title: z.string(),
  category: z.string(),
  summary: z.string(),
  context: z.string(),
  contribution: z.string(),
  cover: figureSchema,
  sections: z.array(z.object({
    id: z.string(),
    title: z.string(),
    paragraphs: z.array(z.string()),
    figures: z.array(figureSchema).optional()
  }))
})

type RdssStudy = z.infer<typeof studySchema>
type PageState = 'loading' | 'locked' | 'ready' | 'error'

definePageMeta({ validate: (): boolean => import.meta.dev })

const study = shallowRef<RdssStudy | null>(null)
const pageState = ref<PageState>('loading')
const password = ref('')
const errorMessage = ref('')
const isSubmitting = ref(false)
const tocSections = computed(() => study.value?.sections.map(section => ({ id: section.id, title: section.title })) ?? [])

useSeoMeta({
  title: 'I4P RDSS — Kolos Káposzta',
  description: 'A password-protected product design and frontend case study.',
  robots: 'noindex, nofollow, noarchive'
})

const loadStudy = async (): Promise<void> => {
  const response = await fetch('/api/i4p-rdss/study', { credentials: 'same-origin' })

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
    const response = await fetch('/api/i4p-rdss/session', {
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
  <main id="main" class="rdss-case case-document page-frame">
    <div class="case-breadcrumb type-caption">
      <NuxtLink to="/#work"><AppIcon name="arrow-back" /> All work</NuxtLink>
      <span>/</span>
      <span>I4P RDSS</span>
    </div>

    <div v-if="pageState === 'loading'" class="rdss-case__gate" role="status">
      <p class="eyebrow type-meta">Private case study</p>
      <p class="type-body">Checking access…</p>
    </div>

    <section v-else-if="pageState === 'locked'" class="rdss-case__gate" aria-labelledby="rdss-gate-title">
      <p class="eyebrow type-meta">Private case study / Enterprise signing</p>
      <h1 id="rdss-gate-title" class="type-section-title">I4P RDSS<span class="period">.</span></h1>
      <p class="type-body-lg">This case study is available with a password.</p>
      <form class="rdss-case__form" @submit.prevent="unlockStudy">
        <label class="type-label" for="rdss-password">Password</label>
        <div class="rdss-case__form-row">
          <input id="rdss-password" v-model="password" type="password" autocomplete="current-password" required>
          <button class="action-link action-link--primary type-nav" type="submit" :disabled="isSubmitting">{{ isSubmitting ? 'Opening…' : 'Open case study' }}</button>
        </div>
        <p v-if="errorMessage" class="rdss-case__error type-body-sm" role="alert">{{ errorMessage }}</p>
      </form>
      <p class="type-body-sm">Don't have the password? <a class="text-link type-link" href="mailto:kap.kolos@gmail.com?subject=I4P%20RDSS%20case%20study%20access">Request access by email <AppIcon name="north-east" /></a></p>
    </section>

    <section v-else-if="pageState === 'error'" class="rdss-case__gate" aria-labelledby="rdss-error-title">
      <h1 id="rdss-error-title" class="type-heading-md">The case study could not load.</h1>
      <p class="type-body">{{ errorMessage }}</p>
    </section>

    <div v-else-if="study" class="rdss-case__layout">
      <article class="rdss-case__article case-document__main">
        <header class="case-hero">
          <p class="eyebrow type-meta">Case study / {{ study.category }}</p>
          <h1 class="type-case-title">{{ study.title }}<span class="period">.</span></h1>
          <p class="case-lead type-lead">{{ study.summary }}</p>
        </header>

        <figure class="case-cover">
          <div class="rdss-case__image-viewport"><img :src="study.cover.src" :alt="study.cover.alt"></div>
          <figcaption class="type-caption">{{ study.cover.caption }} <a :href="study.cover.src" :aria-label="`View full-size image: ${study.cover.alt} (opens in a new tab)`" target="_blank" rel="noopener noreferrer">View full size</a></figcaption>
        </figure>

        <dl class="case-meta">
          <div><dt class="type-label">Context</dt><dd class="type-body-sm">{{ study.context }}</dd></div>
          <div><dt class="type-label">My contribution</dt><dd class="type-body-sm">{{ study.contribution }}</dd></div>
        </dl>

        <section v-for="section in study.sections" :id="section.id" :key="section.id" class="case-section" :aria-labelledby="`${section.id}-title`">
          <div class="case-section__content">
            <h2 :id="`${section.id}-title`" class="type-heading-md">{{ section.title }}</h2>
            <p v-for="paragraph in section.paragraphs" :key="paragraph" class="type-body">{{ paragraph }}</p>
            <figure v-for="figure in section.figures" :key="figure.src" class="case-figure rdss-case__figure">
              <p v-if="figure.label" class="eyebrow type-meta">{{ figure.label }}</p>
              <div class="rdss-case__image-viewport"><img :src="figure.src" :alt="figure.alt" loading="lazy"></div>
              <figcaption class="type-caption">{{ figure.caption }} <a :href="figure.src" :aria-label="`View full-size image: ${figure.alt} (opens in a new tab)`" target="_blank" rel="noopener noreferrer">View full size</a></figcaption>
            </figure>
          </div>
        </section>
      </article>
      <CaseStudyToc :sections="tocSections" />
    </div>
  </main>
</template>

<style scoped>
.rdss-case {
  min-height: 70vh;
  padding-bottom: clamp(5rem, 10vw, 10rem);
}

.rdss-case > .case-breadcrumb {
  max-width: 48rem;
  margin-inline: auto;
}

.rdss-case__gate {
  max-width: 48rem;
  margin-inline: auto;
  padding-block: clamp(6rem, 10vw, 11rem);
}

.rdss-case__gate h1 {
  margin: 1rem 0 1.5rem;
}

.rdss-case__gate > p {
  max-width: 35rem;
}

.rdss-case__form {
  margin-top: 3rem;
}

.rdss-case__form label {
  display: block;
  margin-bottom: 0.7rem;
}

.rdss-case__form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.rdss-case__form input {
  min-width: min(100%, 18rem);
  min-height: 3.3rem;
  padding: 0.85rem 1rem;
  border: 1px solid var(--ink);
  border-radius: 0;
  font: inherit;
}

.rdss-case__form input:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

.rdss-case__form button {
  cursor: pointer;
}

.rdss-case__form button:disabled {
  opacity: 0.6;
  cursor: wait;
}

.rdss-case__error {
  color: #a32020;
}

.rdss-case .case-hero {
  padding-block: clamp(3rem, 5vw, 5rem) clamp(2rem, 3vw, 3rem);
}

.rdss-case .case-meta {
  margin: 0 0 2.5rem;
}

.rdss-case .case-meta dt {
  color: var(--muted);
}

.rdss-case .case-meta dd {
  max-width: 25rem;
  margin: 0.55rem 0 0;
}

.rdss-case__image-viewport {
  overflow-x: auto;
}

.rdss-case__image-viewport img {
  display: block;
  width: 100%;
  height: auto;
}

.rdss-case__figure {
  margin: 2.5rem 0;
}

.rdss-case__figure .eyebrow {
  margin-bottom: 0.7rem;
}

.rdss-case figcaption a {
  color: var(--ink);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

@media (max-width: 620px) {
  .rdss-case__image-viewport img {
    width: 44rem;
    max-width: none;
  }
}
</style>
