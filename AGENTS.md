# Repository instructions

## Project

This repository contains Kolos Káposzta's product-design portfolio. It is a Nuxt 4 application using Vue 3, TypeScript, and plain CSS. Preserve the site's restrained editorial direction and keep the work itself easy to reach and understand.

## Commands

- Run Node package commands through `npm.cmd` on Windows.
- Use `npm.cmd run typecheck` for routine validation.
- Use `npm.cmd run generate` when a change affects routing, rendering, SEO, or production output.
- Never start, stop, or restart a development or preview server. The user controls development servers. You may inspect an existing server.
- Do not create a git commit unless the user explicitly requests one.

## Structure

- `app/app.vue`: global shell, navigation, footer, canonical metadata, and structured data.
- `app/pages/index.vue`: homepage and project listing.
- `app/pages/work/[slug].vue`: shared case-study renderer.
- `app/pages/about.vue`: About page.
- `app/components/`: reusable presentation and interaction components.
- `app/data/caseStudies.ts`: case-study metadata and ordering.
- `app/data/learningToSee.ts` and `app/data/hiddenJam.ts`: authored case-study content.
- `app/assets/css/main.css`: global tokens, typography, shared layout, and case-study styles.
- `app/assets/css/editorial.css`: homepage editorial treatment and responsive overrides.
- `app/config/analytics.ts` and `app/plugins/umami.client.ts`: analytics event names and tracker setup.
- `server/routes/`: generated sitemap and `llms.txt`; both derive case-study information from `app/data/caseStudies.ts`.
- `public/work/`: portfolio imagery served by stable public paths.
- `research/opendoors-portfolio-guide.md`: research reference for portfolio decisions. It is guidance, not product copy.

## Implementation conventions

- Follow the existing Composition API and `<script setup lang="ts">` style.
- Keep data immutable with `readonly` types and `satisfies` where the project already uses them.
- Prefer small, pure functions. Do not mutate inputs or global state.
- Use explicit types for function returns and structured data. Avoid `any` and weak generic objects.
- Do not add default parameter values. Keep functions single-purpose and avoid behavior-switching flags.
- Reuse existing components, type classes, spacing tokens, and CSS variables before adding new abstractions.
- Keep comments in English and add them only where intent is not clear from the code.
- Preserve semantic HTML, keyboard access, visible focus states, descriptive alternative text, and reduced-motion behavior.
- Use `NuxtLink` for internal routes and normal anchors with `rel="noopener noreferrer"` for external links opened in a new tab.
- Add analytics only for meaningful user actions and reuse names from `app/config/analytics.ts`.

## Portfolio content rules

- Treat all portfolio claims as factual professional claims. Never invent metrics, users, research findings, employers, responsibilities, testimonials, shipped status, or business outcomes.
- Clearly distinguish measured outcomes, qualitative feedback, prototype observations, intended benefits, and future work.
- For team projects, state Kolos's individual contribution separately from the team's work whenever the source material supports it.
- Prefer concise narrative headings that communicate the finding, decision, or outcome over labels such as “Research,” “Process,” or “Solution.”
- Keep case studies scannable: front-load the problem, contribution, representative solution, and available evidence; remove repetition and process artifacts that do not change the story.
- Do not hide essential project evidence in external Figma files, slide decks, or legacy case studies when it can be presented on the native portfolio page.
- Preserve Hungarian names and diacritics, including “Kolos Káposzta.”
- Ask the user for missing evidence when a requested improvement would otherwise require an unsupported claim.

## Visual and responsive work

- Check changes at a desktop width and at a narrow mobile width down to 320px.
- Confirm there is no horizontal overflow and that important interface details remain legible without zooming.
- Use motion to explain product behavior or guide attention. Avoid decorative motion that competes with project content.
- Keep project imagery sharp, correctly proportioned, and large enough to inspect.
- Treat the homepage hero and project previews as one positioning system: their claims and emphasis must agree with the case studies.

## Scope and verification

- Read the relevant component, data, and style files before editing.
- Keep changes minimal and do not revert unrelated working-tree changes.
- After code changes, run `npm.cmd run typecheck` and `git --no-pager diff --check`.
- For layout or interaction changes, inspect the already-running site on desktop and mobile after validation.
- Run `npm.cmd run generate` only when broader production verification is warranted; do not repeat it after unrelated edits.
