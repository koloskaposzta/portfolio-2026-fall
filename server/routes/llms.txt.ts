import { caseStudies } from '../../app/data/caseStudies'

const createCaseStudyLinks = (siteUrl: string): string => caseStudies
  .map(study => `- [${study.title}](${siteUrl}/work/${study.slug}): ${study.summary}`)
  .join('\n')

const createLlmsText = (siteUrl: string): string => `# Kolos Káposzta — Product designer

Kolos Káposzta is a Budapest-based product and UI/UX designer with a front-end development background. His work combines product thinking, interaction design, interface design, and an understanding of implementation constraints.

## Main pages

- [Portfolio](${siteUrl}/): Selected product design work and contact form.
- [About](${siteUrl}/about): Background in enterprise software, front-end development, and Digital Product Design studies at MOME Open.
- [Privacy](${siteUrl}/privacy): How contact-form information and anonymous website analytics are handled.
${createCaseStudyLinks(siteUrl)}

## Profiles

- [GitHub](https://github.com/koloskaposzta)
- [LinkedIn](https://www.linkedin.com/in/kolos-k%C3%A1poszta-04891421a/)
`

export default defineEventHandler((event): string => {
  const config = useRuntimeConfig(event)
  const siteUrl = config.public.siteUrl.replace(/\/$/, '')

  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return createLlmsText(siteUrl)
})
