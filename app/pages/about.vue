<script setup lang="ts">
useSeoMeta({
  title: 'About — Kolos Káposzta',
  description: 'UI/UX designer and front-end developer, with a background in enterprise products and Digital Product Design studies at MOME Open.'
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
        <p class="type-body-lg">My experience includes designing and building a complex enterprise application, alongside illustrations and landing pages. Working with a design-focused team showed me how hierarchy and structure could make a complicated product easier to understand.</p>
        <p class="type-body-lg">That curiosity grew through a university startup program, where I worked with a mixed student team on an early product idea around legal writing. I went on to study Digital Product Design at MOME Open, learning from designers and industry mentors.</p>
        <p class="type-body-lg">I bring an understanding of systems, interface states, and implementation constraints to my design work. I care about clear, thoughtful interfaces, and I want to keep learning through making and collaboration.</p>
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
