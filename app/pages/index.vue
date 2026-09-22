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
        <p class="eyebrow type-meta">01 / Work</p>
        <h2 id="work-title" class="type-section-title">Selected projects<span class="period">.</span></h2>
      </div>

      <article v-for="(study, index) in caseStudies" :key="study.slug" class="project-card">
        <NuxtLink class="project-card__link" :to="`/work/${study.slug}`">
          <div class="project-card__image">
            <img :src="study.cover.src" :alt="study.cover.alt" loading="lazy">
          </div>
          <div class="project-card__content">
            <span class="project-card__number type-label">0{{ index + 1 }}</span>
            <div>
              <p class="project-card__category type-label">{{ study.category }}</p>
              <h3 class="type-project-title">{{ study.title }}</h3>
              <p class="project-card__summary type-body-sm">{{ study.summary }}</p>
            </div>
            <span class="text-link type-link">View case study <span aria-hidden="true">↗</span></span>
          </div>
        </NuxtLink>
      </article>
    </section>

    <ContactSection />
  </main>
</template>

