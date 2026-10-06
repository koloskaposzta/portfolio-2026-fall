import { rdssCaseStudyAccess, requireCaseStudySession } from '../../../utils/caseStudyAuth'

const imageFiles = [
  { name: 'dashboard-concept', file: 'dashboard-concept.png', contentType: 'image/png' },
  { name: 'upload-flow', file: 'upload-flow.png', contentType: 'image/png' },
  { name: 'signing', file: 'signing.jpg', contentType: 'image/jpeg' },
  { name: 'authorization', file: 'authorization.jpg', contentType: 'image/jpeg' },
  { name: 'signing-result', file: 'signing-result.png', contentType: 'image/png' }
] as const

export default defineEventHandler(async (event): Promise<Uint8Array> => {
  requireCaseStudySession(event, rdssCaseStudyAccess)
  const name = getRouterParam(event, 'name')
  const imageFile = imageFiles.find(file => file.name === name)

  if (!imageFile) {
    throw createError({ statusCode: 404, statusMessage: 'Case study image not found.' })
  }

  const image = await useStorage('assets:server').getItemRaw(`i4p-rdss/${imageFile.file}`)

  if (!(image instanceof Uint8Array)) {
    throw createError({ statusCode: 500, statusMessage: `Case study image is missing: ${imageFile.name}.` })
  }

  setHeader(event, 'content-type', imageFile.contentType)
  setHeader(event, 'cache-control', 'private, no-store')
  return image
})
