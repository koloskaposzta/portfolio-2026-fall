# Kolos Káposzta portfolio

Nuxt 4 portfolio with a home page and two case studies. Project content is based on the existing Kolos Káposzta portfolio; the visual direction is a starting point for further design work.

## Local commands (PowerShell)

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run generate
```

Only start the development server when you want to work on the site. Static output is written to `.output/public`.

## Umami

Create the website in Umami Cloud and set `NUXT_PUBLIC_UMAMI_WEBSITE_ID` for the production build. `NUXT_PUBLIC_UMAMI_SCRIPT_URL` defaults to the Cloud script and can be changed for the selected region. The tracker loads only on `koloskaposzta.com`; it is absent on localhost and preview domains. Umami automatically tracks page loads and Nuxt route changes.

Real interactions use `contact_click`, `external_project_click` and `case_study_next`. `case_study_50` fires once per case study view when the top of the viewport reaches the midpoint of the case study body. Event names are defined in `app/config/analytics.ts`.

Before launch, confirm pageviews and custom events in the Umami dashboard and review privacy information.
