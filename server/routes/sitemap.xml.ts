import { caseStudies } from '../../app/data/caseStudies'

type SitemapPage = Readonly<{
  path: string
  priority: string
}>

const escapeXml = (value: string): string => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;')

const createSitemap = (siteUrl: string, pages: readonly SitemapPage[]): string => {
  const urls = pages
    .map(page => `  <url><loc>${escapeXml(`${siteUrl}${page.path}`)}</loc><priority>${page.priority}</priority></url>`)
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

export default defineEventHandler((event): string => {
  const config = useRuntimeConfig(event)
  const siteUrl = config.public.siteUrl.replace(/\/$/, '')
  const pages: readonly SitemapPage[] = [
    { path: '/', priority: '1.0' },
    { path: '/about', priority: '0.8' },
    ...caseStudies.map(study => ({ path: `/work/${study.slug}`, priority: '0.9' }))
  ]

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return createSitemap(siteUrl, pages)
})
