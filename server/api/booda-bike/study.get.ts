import { boodaBikeStudy } from '../../data/boodaBike'
import { boodaCaseStudyAccess, requireCaseStudySession } from '../../utils/caseStudyAuth'

export default defineEventHandler((event): typeof boodaBikeStudy => {
  requireCaseStudySession(event, boodaCaseStudyAccess)
  setHeader(event, 'cache-control', 'private, no-store')
  return boodaBikeStudy
})
