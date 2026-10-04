<script setup lang="ts">
type AboutPhoto = {
  readonly src: string
  readonly title: string
  readonly alt: string
  readonly position: string
}

const photos = [
  { src: '/about/me_crafting.jpeg', title: 'Crafting', alt: 'Kolos working at a laptop', position: 'center' },
  { src: '/about/me_relaxing_the_same_friday.jpg', title: 'Relaxing the same Friday', alt: 'Kolos relaxing in an armchair at an art exhibition', position: 'center 65%' },
  { src: '/about/me_presenting_work.jpg', title: 'Presenting work', alt: 'Kolos presenting a design project to an audience', position: 'center' },
  { src: '/about/me_at_number1_tourist_spot.jpg', title: 'At the number one tourist spot', alt: 'Kolos by the Danube with the Hungarian Parliament behind him', position: 'center 65%' }
] as const satisfies readonly AboutPhoto[]

const activePhotoIndex = ref<number>(0)

const stackPosition = (index: number, activeIndex: number, total: number): number =>
  (index - activeIndex + total) % total

const showNextPhoto = (): void => {
  activePhotoIndex.value = (activePhotoIndex.value + 1) % photos.length
}

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
      <div class="about-page__intro-copy">
        <p class="eyebrow type-meta">About / Kolos Káposzta</p>
        <h1 class="type-about-title">Design informed<br>by making<span class="period">.</span></h1>
        <p class="type-lead">I’m Kolos, a UI/UX designer with a front-end development background.</p>
      </div>

      <figure class="about-photos">
        <button class="about-photos__stack" type="button" aria-label="Show next photo" data-cursor-action="Next" @click="showNextPhoto">
          <span
            v-for="(photo, index) in photos"
            :key="photo.src"
            class="about-photos__card"
            :style="{ '--stack-position': stackPosition(index, activePhotoIndex, photos.length), '--photo-position': photo.position }"
            :aria-hidden="index !== activePhotoIndex"
          >
            <img :src="photo.src" :alt="index === activePhotoIndex ? photo.alt : ''" :loading="index === 0 ? 'eager' : 'lazy'" width="800" height="600">
          </span>
        </button>
        <figcaption class="about-photos__caption type-caption" aria-live="polite">
          <span>{{ String(activePhotoIndex + 1).padStart(2, '0') }} / {{ String(photos.length).padStart(2, '0') }}</span>
          <span>{{ photos[activePhotoIndex]?.title }}</span>
          <span aria-hidden="true">Shuffle ↗</span>
        </figcaption>
      </figure>
    </header>

    <section class="about-page__story" aria-labelledby="background-title">
      <h2 id="background-title" class="type-heading-md">My way into design</h2>
      <div class="about-copy">
        <p class="type-body-lg">I studied software development and found my way into design through building interfaces. Working on a complex enterprise application with a design-focused team made me curious about the decisions behind the screens: how structure, hierarchy, and interaction can make a difficult product easier to understand.</p>
        <p class="type-body-lg">That curiosity took me through a university startup program and then to Digital Product Design at MOME Open. I didn’t start out surrounded by designers, so I’ve made a habit of seeking out their perspectives—at Budapest events like POV, through talks and podcasts, and in exhibitions. I enjoy bringing what I learn back to the things I make.</p>
        <p class="type-body-lg">Away from the screen, I’m usually running, cycling, climbing, or finding another reason to be outdoors. I’m just as happy at a small gig or a good Budapest pub, and I have a soft spot for bands with fewer than 100 listeners.</p>
        <NuxtLink class="text-link type-link" to="/#work">Explore my work <AppIcon name="north-east" /></NuxtLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.about-page {
  padding-block: var(--space-section);
}

.about-page__intro {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(20rem, 0.8fr);
  align-items: center;
  gap: clamp(3rem, 6vw, 7rem);
}

.about-page__intro-copy h1 {
  margin: 1.5rem 0 2rem;
}

.about-page__intro-copy > p:last-child {
  max-width: 48rem;
}

.about-photos {
  min-width: 0;
  margin: 1.75rem 1.75rem 0 0;
}

.about-photos__stack {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.about-photos__stack:focus-visible {
  outline: 2px solid var(--ink);
  outline-offset: 2rem;
}

.about-photos__card {
  position: absolute;
  inset: 0;
  z-index: calc(4 - var(--stack-position));
  overflow: hidden;
  border: 1px solid var(--line);
  background: var(--paper);
  box-shadow: 0 0.6rem 1.8rem rgb(0 0 0 / 0.11);
  transform: translate(calc(var(--stack-position) * 0.5rem), calc(var(--stack-position) * -0.5rem)) rotate(calc(var(--stack-position) * 2deg));
  transition: transform 400ms var(--ease-out);
}

.about-photos__card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: var(--photo-position);
}

.about-photos__caption {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
  color: var(--muted);
}

.about-photos__caption span:last-child {
  white-space: nowrap;
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
  .about-page__intro {
    grid-template-columns: 1fr;
  }

  .about-photos {
    width: min(100% - 1.75rem, 36rem);
    margin: 1rem 1.75rem 0 0;
  }

  .about-page__story {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .about-photos__card {
    transition: none;
  }
}
</style>
