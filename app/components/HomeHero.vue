<template>
  <section class="editorial-hero" aria-labelledby="hero-title">
    <HeroAtmosphere :intensity="0.12" />
    <div class="page-frame editorial-hero__inner">
      <h1 id="hero-title" class="editorial-hero__title type-hero-title">
        <span>I’m Kolos.</span>
        <span>I am a <span class="editorial-hero__outlined">Design Engineer</span></span>
        <span>working on interfaces.</span>
      </h1>
      <div class="editorial-hero__bottom">
        <a class="editorial-hero__down" href="#work" aria-label="Explore selected work"><span aria-hidden="true">↓</span></a>
        <p class="type-body-sm">I’m a product designer with a front-end background. I enjoy starting with a new idea, understanding the problem, and finding a practical way to make it real.</p>
      </div>
      <SignatureMotion name="intro" />
    </div>
  </section>
</template>
