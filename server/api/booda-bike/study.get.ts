import { boodaBikeStudy } from '../../data/boodaBike'
import { requireBoodaCaseStudySession } from '../../utils/boodaCaseStudyAuth'

export default defineEventHandler((event): typeof boodaBikeStudy => {
  requireBoodaCaseStudySession(event)
  setHeader(event, 'cache-control', 'private, no-store')
  return boodaBikeStudy
})
