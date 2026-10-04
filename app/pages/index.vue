<script setup lang="ts">
import { caseStudies } from '~/data/caseStudies'

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

      <CurrentSideProject />

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

      <article class="project-card project-card--private">
        <NuxtLink class="project-card__link" to="/work/booda-bike">
          <div class="project-card__image">
            <img src="/work/booda-preview.png" alt="Booda Bike contact form with customer-worded support topics" loading="lazy">
            <span class="project-card__private-label type-label">Private case study</span>
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
    </section>

    <section class="home-about page-frame" aria-labelledby="home-about-title">
      <div class="section-topline">
        <h2 id="home-about-title" class="type-section-title">About me<span class="period">.</span></h2>
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

.project-card__private-label {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 0.65rem;
  background: var(--ink);
  color: var(--paper);
}

.project-card__access {
  margin: -1.5rem 0 2rem;
  color: var(--muted);
}
</style>

