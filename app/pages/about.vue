<script setup lang="ts">
useSeoMeta({
  title: 'About — Kolos Káposzta',
  description: 'UI/UX designer and front-end developer, with a background in enterprise products and Digital Product Design studies at MOME Open.',
  ogTitle: 'About Kolos Káposzta',
  ogDescription: 'UI/UX designer and front-end developer, with a background in enterprise products and Digital Product Design studies at MOME Open.',
  twitterTitle: 'About Kolos Káposzta',
  twitterDescription: 'UI/UX designer and front-end developer, with a background in enterprise products and Digital Product Design studies at MOME Open.'
})
</script>

<template>
  <main id="main" class="about-page page-frame">
    <header class="about-page__intro">
      <p class="eyebrow type-meta">About / Kolos Káposzta</p>
      <h1 class="type-about-title">Design informed<br>by making<span class="period">.</span></h1>
      <p class="type-lead">I’m Kolos, a UI/UX designer with a front-end development background.</p>
    </header>

    <section class="about-page__story" aria-labelledby="background-title">
      <h2 id="background-title" class="type-heading-md">My way into design</h2>
      <div class="about-copy">
        <p class="type-body-lg">I studied software development and found my way into design through building interfaces. Working on a complex enterprise application with a design-focused team made me curious about the decisions behind the screens: how structure, hierarchy, and interaction can make a difficult product easier to understand.</p>
        <p class="type-body-lg">That curiosity took me through a university startup program and then to Digital Product Design at MOME Open. I didn’t start out surrounded by designers, so I’ve made a habit of seeking out their perspectives—at Budapest events like POV, through talks and podcasts, and in exhibitions. I enjoy bringing what I learn back to the things I make.</p>
        <p class="type-body-lg">Away from the screen, I’m usually running, cycling, climbing, or finding another reason to be outdoors. I’m just as happy at a small gig or a good Budapest pub, and I have a soft spot for bands with fewer than 100 listeners.</p>
        <NuxtLink class="text-link type-link" to="/#work">Explore my work <span aria-hidden="true">↗</span></NuxtLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.about-page {
  padding-block: var(--space-section);
}

.about-page__intro h1 {
  margin: 1.5rem 0 2rem;
}

.about-page__intro > p:last-child {
  max-width: 48rem;
}

.about-page__story {
  display: grid;
  grid-template-columns: 1fr minmax(17rem, 0.9fr);
  gap: clamp(2rem, 6vw, 6rem);
  margin-top: var(--space-section);
  padding-top: 2rem;
  border-top: 1px solid var(--line);
}

.about-page__story h2 {
  margin: 0;
}

@media (max-width: 900px) {
  .about-page__story {
    grid-template-columns: 1fr;
  }
}
</style>
