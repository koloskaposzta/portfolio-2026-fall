<template>
  <section id="contact" class="contact-section page-frame" aria-labelledby="contact-title">
    <div class="contact-section__intro">
      <h2 id="contact-title" class="type-section-title">Let’s talk<span class="period">.</span></h2>
      <p class="type-body-lg">A role, a project, or a good conversation.<br>I’m all ears.</p>
    </div>

    <form class="contact-form" aria-labelledby="contact-title" @submit.prevent>
      <div class="contact-form__field">
        <label class="type-label" for="contact-name">Name</label>
        <input id="contact-name" name="name" type="text" autocomplete="name" placeholder="Your name" required>
      </div>
      <div class="contact-form__field">
        <label class="type-label" for="contact-email">Email</label>
        <input id="contact-email" name="email" type="email" autocomplete="email" placeholder="you@company.com" required>
      </div>
      <div class="contact-form__field">
        <label class="type-label" for="contact-message">Message</label>
        <textarea id="contact-message" name="message" rows="6" placeholder="Dear Kolos, I'm very grateful to find you! You must be talented and also a wonderful person to work with. We would love to have you on our team, where you can contribute your skills and grow professionally! I can't believe no one has approached you yet… Lets schedule a meeting!" required />
      </div>
      <label class="contact-form__privacy type-caption" for="contact-privacy">
        <input id="contact-privacy" name="privacyAcknowledged" type="checkbox" required>
        <span class="contact-form__checkbox" aria-hidden="true" />
        <span>I have read the <NuxtLink to="/privacy">privacy notice</NuxtLink>.</span>
      </label>
      <div>
        <button class="contact-form__submit action-link type-nav" type="submit" disabled aria-describedby="contact-status">Send message <span aria-hidden="true">↗</span></button>
        <p id="contact-status" class="type-caption">Message sending will be available soon.</p>
      </div>
    </form>
  </section>
</template>

<style scoped>
.contact-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2rem, 6vw, 6rem);
  padding-block: var(--space-section);
  border-top: 1px solid var(--line);
}

.contact-section__intro h2 {
  margin: 0 0 1.5rem;
}

.contact-form,
.contact-form__field {
  display: grid;
  gap: 0.75rem;
}

.contact-form {
  gap: 1.75rem;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  min-width: 0;
  padding: 1rem;
  border: 1px solid var(--line);
  border-radius: 0;
  color: var(--ink);
  background: var(--paper);
  font: inherit;
  line-height: 1.5;
}

.contact-form textarea {
  resize: vertical;
  min-height: 10rem;
}

.contact-form :is(input, textarea)::placeholder {
  color: var(--muted);
  opacity: 1;
}

.contact-form :is(input, textarea):focus-visible {
  outline: 2px solid var(--ink);
  outline-offset: 3px;
}

.contact-form__privacy {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

.contact-form__privacy input {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
}

.contact-form__checkbox {
  display: grid;
  width: 1.25rem;
  height: 1.25rem;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid var(--ink);
  background: var(--paper);
}

.contact-form__privacy input:checked + .contact-form__checkbox {
  background: var(--ink);
}

.contact-form__privacy input:checked + .contact-form__checkbox::after {
  width: 0.35rem;
  height: 0.65rem;
  border: solid var(--paper);
  border-width: 0 2px 2px 0;
  content: '';
  transform: translateY(-0.05rem) rotate(45deg);
}

.contact-form__privacy input:focus-visible + .contact-form__checkbox {
  outline: 2px solid var(--ink);
  outline-offset: 3px;
}

.contact-form__privacy a {
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.contact-form__submit:disabled {
  color: var(--muted);
  background: var(--paper);
  border-color: var(--line);
  font-family: inherit;
  cursor: not-allowed;
}

#contact-status {
  color: var(--muted);
}

#contact-status a {
  color: var(--ink);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

@media (max-width: 900px) {
  .contact-section {
    grid-template-columns: 1fr;
  }
}
</style>
