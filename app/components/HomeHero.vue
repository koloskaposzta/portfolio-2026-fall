<template>
  <section class="editorial-hero" aria-labelledby="hero-title">
    <HeroAtmosphere :intensity="0.12" />
    <div class="page-frame editorial-hero__inner">
      <h1 id="hero-title" class="editorial-hero__title type-hero-title">
        <span>Think.</span><span>Design.</span><span>Make it work.</span>
      </h1>
      <div class="editorial-hero__bottom">
        <a class="editorial-hero__down" href="#work" aria-label="Explore selected work"><span aria-hidden="true">↓</span></a>
        <p class="type-body-sm">Product designer.<br>Front-end background.<br>From the problem to the product.</p>
      </div>
      <SignatureMotion name="intro" />
    </div>
  </section>
</template>
