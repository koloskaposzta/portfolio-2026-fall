<script setup lang="ts">
import { caseStudies } from '~/data/caseStudies'

const showI4pDraft = import.meta.dev

useSeoMeta({
  title: 'Kolos Káposzta — Product designer',
  description: 'Selected product design work by Kolos Káposzta, a designer with a front-end development background.',
  ogTitle: 'Kolos Káposzta — Product designer',
  ogDescription: 'Selected product design work by Kolos Káposzta, a designer with a front-end development background.',
  ogImage: 'https://koloskaposzta.com/work/learning-cover.png',
  ogImageAlt: 'Selected product design work by Kolos Káposzta',
  twitterTitle: 'Kolos Káposzta — Product designer',
  twitterDescription: 'Selected product design work by Kolos Káposzta, a designer with a front-end development background.',
  twitterImage: 'https://koloskaposzta.com/work/learning-cover.png'
})
</script>

<template>
  <main id="main">
    <HomeHero />

    <section id="work" class="work-section page-frame" aria-labelledby="work-title">
      <div class="section-topline">
        <h2 id="work-title" class="type-section-title">Selected projects<span class="period">.</span></h2>
      </div>

      <article class="project-card project-card--private">
        <NuxtLink class="project-card__link" to="/work/booda-bike">
          <div class="project-card__image">
            <img src="/work/booda-preview.png" alt="Booda Bike contact form with customer-worded support topics" loading="lazy">
            <ProjectPasswordCover />
          </div>
          <div class="project-card__content">
            <div>
              <p class="project-card__category type-label">Customer support · Design engineering</p>
              <h3 class="type-project-title">Booda Bike Help Center</h3>
              <p class="project-card__summary type-body-sm">Connecting self-service answers, task guidance and contextual contact in one support journey.</p>
              <p class="project-card__access type-caption">Password required to read the full story.</p>
            </div>
            <span class="text-link type-link">View case study <AppIcon name="north-east" /></span>
          </div>
        </NuxtLink>
      </article>

      <article v-for="study in caseStudies" :key="study.slug" class="project-card">
        <NuxtLink class="project-card__link" :to="`/work/${study.slug}`">
          <div class="project-card__image">
            <img :src="study.cover.src" :alt="study.cover.alt" loading="lazy">
          </div>
          <div class="project-card__content">
            <div>
              <p class="project-card__category type-label">{{ study.category }}</p>
              <h3 class="type-project-title">{{ study.title }}</h3>
              <p class="project-card__summary type-body-sm">{{ study.summary }}</p>
            </div>
            <span class="text-link type-link">View case study <AppIcon name="north-east" /></span>
          </div>
        </NuxtLink>
      </article>

      <article v-if="showI4pDraft" class="project-card project-card--private">
        <NuxtLink class="project-card__link" to="/work/i4p-rdss">
          <div class="project-card__image rdss-preview">
            <div class="rdss-preview__sheet" role="img" aria-label="RDSS signing journey from document upload through participants and authorization to a signed document">
              <span class="rdss-preview__overline type-label">I4P / RDSS</span>
              <strong>Document to signature</strong>
              <ol>
                <li><span>01</span> Add document</li>
                <li><span>02</span> Set participants</li>
                <li><span>03</span> Authorize signing</li>
              </ol>
            </div>
            <ProjectPasswordCover />
          </div>
          <div class="project-card__content">
            <div>
              <p class="project-card__category type-label">Draft · Enterprise signing · Design engineering</p>
              <h3 class="type-project-title">I4P RDSS</h3>
              <p class="project-card__summary type-body-sm">Connecting document workflows, credential activation and authenticated signing in one browser interface.</p>
              <p class="project-card__access type-caption">Password required to read the full story.</p>
            </div>
            <span class="text-link type-link">View case study <AppIcon name="north-east" /></span>
          </div>
        </NuxtLink>
      </article>
    </section>

    <section class="page-frame" aria-labelledby="current-side-project-title">
      <div class="section-topline">
        <h2 id="current-side-project-title" class="type-section-title">Current side-project</h2>
      </div>
      <CurrentSideProject />
    </section>

    <section class="home-about page-frame" aria-labelledby="home-about-title">
      <div class="section-topline">
        <h2 id="home-about-title" class="type-section-title">About me</h2>
      </div>
      <div class="home-about__content">
        <p class="type-body">I came to design through software development and keep learning from what I build, the people I meet, and the talks and exhibitions I seek out. Away from work, I’m usually outdoors or somewhere listening to a band you probably haven’t heard of.</p>
        <NuxtLink class="action-link type-nav" to="/about">More about me <AppIcon name="north-east" /></NuxtLink>
      </div>
    </section>

    <ContactSection />
  </main>
</template>

<style scoped>
.project-card--private .project-card__image {
  position: relative;
  border: 1px solid var(--line);
}

.project-card--private .project-card__image img {
  object-fit: cover;
  object-position: top;
}

.project-card__access {
  margin: -1.5rem 0 2rem;
  color: var(--muted);
}

.rdss-preview {
  padding: clamp(1rem, 4vw, 3rem);
  background: #e7e5df;
}

.rdss-preview__sheet {
  width: min(100%, 31rem);
  padding: clamp(1.25rem, 3vw, 2.5rem);
  border: 1px solid var(--line);
  background: var(--paper);
  box-shadow: 0.6rem 0.6rem 0 #d0cec7;
}

.rdss-preview__overline {
  display: block;
  margin-bottom: 1.25rem;
  color: var(--muted);
}

.rdss-preview__sheet strong {
  display: block;
  max-width: 15rem;
  font-size: clamp(1.5rem, 3vw, 2.6rem);
  font-weight: 500;
  letter-spacing: -0.055em;
  line-height: 1.08;
}

.rdss-preview__sheet ol {
  display: grid;
  gap: 0.55rem;
  margin: 1.5rem 0 0;
  padding: 0;
  list-style: none;
}

.rdss-preview__sheet li {
  display: flex;
  gap: 1rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--line);
  font-size: clamp(0.8rem, 1.2vw, 0.95rem);
}

.rdss-preview__sheet li span {
  color: var(--muted);
}
</style>

