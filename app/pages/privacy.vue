<script setup lang="ts">
const contactEnabled = useRuntimeConfig().public.contactEnabled

useSeoMeta({
  title: 'Privacy notice — Kolos Káposzta',
  description: 'How personal information and anonymous website analytics are handled on the portfolio of Kolos Káposzta.',
  ogTitle: 'Privacy notice — Kolos Káposzta',
  ogDescription: 'How personal information and anonymous website analytics are handled on this portfolio.',
  twitterTitle: 'Privacy notice — Kolos Káposzta',
  twitterDescription: 'How personal information and anonymous website analytics are handled on this portfolio.'
})
</script>

<template>
  <main id="main" class="privacy-page page-frame">
    <header class="privacy-page__header">
      <p class="eyebrow type-meta">Privacy</p>
      <h1 class="type-section-title">Privacy notice<span class="period">.</span></h1>
      <p class="type-caption">Last updated: 27 September 2026</p>
    </header>

    <div class="privacy-page__content type-body">
      <section aria-labelledby="overview-title">
        <h2 id="overview-title" class="type-heading-md">Overview</h2>
        <p>This portfolio is operated by Kolos Káposzta in Budapest, Hungary. This notice explains how information is handled when you browse the site or contact me.</p>
        <p>For enquiries or privacy requests, email <a href="mailto:kap.kolos@gmail.com">kap.kolos@gmail.com</a>.</p>
        <p v-if="!contactEnabled">The contact form is currently disabled and does not submit information. The form-related processing described below applies when message sending is enabled. You can still contact me by email.</p>
      </section>

      <section aria-labelledby="contact-data-title">
        <h2 id="contact-data-title" class="type-heading-md">Contact enquiries</h2>
        <p>When you send an enquiry, I receive the name, email address, and message you provide. The contact form requires these fields to send your message. Please do not include sensitive personal information that is unnecessary for your enquiry.</p>
        <p>I use this information to read, respond to, and follow up on your enquiry. The legal basis is legitimate interests under Article 6(1)(f) GDPR—communicating with people who contact me—or Article 6(1)(b) when your message asks me to take steps before entering into a contract. The privacy checkbox acknowledges this notice; it is not consent to marketing.</p>
        <p>Form messages are sent through Resend to my Gmail inbox. The website does not maintain a separate database of messages. Resend processes the message and delivery information, and Google stores the email and subsequent correspondence.</p>
        <p>Enquiry data will normally be deleted within 12 months after the conversation ends. It may be kept longer when reasonably necessary to establish, exercise, or defend legal claims, or to comply with a legal obligation.</p>
      </section>

      <section aria-labelledby="security-title">
        <h2 id="security-title" class="type-heading-md">Spam protection and hosting</h2>
        <p>The contact form uses Vercel BotID to help distinguish people from automated requests before a message is accepted. BotID processes technical request information, such as request headers, cookies set for bot protection, browser signals, IP address, requested URL, and the protected endpoint.</p>
        <p>Vercel hosts the website and processes technical request information, including IP addresses, requested URLs, and browser information, to deliver and secure it. Hosting and security processing is based on legitimate interests under Article 6(1)(f) GDPR: operating the website and preventing abuse.</p>
      </section>

      <section aria-labelledby="analytics-title">
        <h2 id="analytics-title" class="type-heading-md">Privacy-friendly analytics</h2>
        <p>This site uses Umami to understand aggregate use, such as visited pages, referrer, browser, operating system, device type, and approximate country. Umami does not use cookies. An IP address may be used to derive anonymous metrics but is not stored.</p>
        <p>The legal basis is legitimate interests under Article 6(1)(f) GDPR: understanding whether the portfolio works well and improving it. Analytics data is kept only while it remains useful for comparing site trends and is reviewed at least annually.</p>
      </section>

      <section aria-labelledby="sharing-title">
        <h2 id="sharing-title" class="type-heading-md">Service providers and transfers</h2>
        <p>The selected providers are <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noopener noreferrer">Vercel</a> for hosting and BotID spam protection, <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Resend</a> for form email delivery, <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Gmail</a> for correspondence, and <a href="https://umami.is/privacy" target="_blank" rel="noopener noreferrer">Umami Cloud</a> for analytics.</p>
        <p>Personal information is not sold. Providers may process information outside the European Economic Area, including in the United States. Applicable safeguards may include adequacy decisions or Standard Contractual Clauses, depending on the provider and service. You can request information about the safeguards applicable to your enquiry by emailing me.</p>
      </section>

      <section aria-labelledby="rights-title">
        <h2 id="rights-title" class="type-heading-md">Your rights</h2>
        <p>Depending on the circumstances, you may request access to, correction of, deletion of, or restriction of your personal information, and you may object to processing based on legitimate interests. You may also have a right to data portability. Send requests to <a href="mailto:kap.kolos@gmail.com">kap.kolos@gmail.com</a>.</p>
        <p>No automated decisions with legal or similarly significant effects are made about you. Automated spam checks may reject a form submission; you can contact me directly by email instead. You may lodge a complaint with the Hungarian National Authority for Data Protection and Freedom of Information (NAIH) or another competent supervisory authority.</p>
        <a class="text-link type-link" href="https://www.naih.hu/data-protection/investigation-by-the-authority" target="_blank" rel="noopener noreferrer">Contact NAIH <AppIcon name="north-east" /></a>
      </section>

      <section aria-labelledby="changes-title">
        <h2 id="changes-title" class="type-heading-md">Changes to this notice</h2>
        <p>This notice will be updated when the contact form is connected, providers change, or the site begins processing information in a materially different way. The date at the top shows the latest revision.</p>
      </section>
    </div>
  </main>
</template>

<style scoped>
.privacy-page {
  padding-block: var(--space-section);
}

.privacy-page__header {
  padding-bottom: clamp(3rem, 6vw, 6rem);
  border-bottom: 1px solid var(--line);
}

.privacy-page__header h1 {
  margin: 1.5rem 0;
}

.privacy-page__header p:last-child {
  color: var(--muted);
}

.privacy-page__content {
  width: min(100%, 48rem);
  margin: 0 auto;
}

.privacy-page__content section {
  padding-block: clamp(2.5rem, 5vw, 4.5rem);
  border-bottom: 1px solid var(--line);
}

.privacy-page__content h2 {
  margin: 0 0 1.5rem;
}

.privacy-page__content p {
  margin: 0 0 1.2rem;
  color: var(--muted);
}
</style>
