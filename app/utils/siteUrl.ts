export const normalizeSiteUrl = (siteUrl: string): string => {
  const candidate = /^https?:\/\//i.test(siteUrl) ? siteUrl : `https://${siteUrl}`
  const isOrigin = /^https?:\/\/[^/?#]+\/?$/i.test(candidate)

  if (!isOrigin) {
    throw new TypeError(`Invalid site URL "${siteUrl}". Expected an HTTPS origin without a path, query string, or fragment.`)
  }

  const parsedUrl = new URL(candidate)

  if (parsedUrl.protocol !== 'https:') {
    throw new TypeError(`Invalid site URL "${siteUrl}". The site URL must use HTTPS.`)
  }

  if (parsedUrl.username || parsedUrl.password) {
    throw new TypeError(`Invalid site URL "${siteUrl}". Credentials are not allowed in the site URL.`)
  }

  return parsedUrl.origin
}
