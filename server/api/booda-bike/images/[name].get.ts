import { boodaCaseStudyAccess, requireCaseStudySession } from '../../../utils/caseStudyAuth'

const imageNames = ['help-center-home', 'contact-flow', 'contact-flow-mobile', 'return-flow', 'return-flow-mobile', 'shipping-article', 'warranty-notice', 'warranty-notice-mobile', 'related-products', 'related-products-mobile'] as const

export default defineEventHandler(async (event): Promise<Uint8Array> => {
  requireCaseStudySession(event, boodaCaseStudyAccess)
  const name = getRouterParam(event, 'name')

  if (!name || !imageNames.some(imageName => imageName === name)) {
    throw createError({ statusCode: 404, statusMessage: 'Case study image not found.' })
  }

  const image = await useStorage('assets:server').getItemRaw(`booda-bike/${name}.png`)

  if (!(image instanceof Uint8Array)) {
    throw createError({ statusCode: 500, statusMessage: `Case study image is missing: ${name}.` })
  }

  setHeader(event, 'content-type', 'image/png')
  setHeader(event, 'cache-control', 'private, no-store')
  return image
})
