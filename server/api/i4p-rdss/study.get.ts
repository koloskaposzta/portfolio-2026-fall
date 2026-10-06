import { i4pRdssStudy } from '../../data/i4pRdss'
import { rdssCaseStudyAccess, requireCaseStudySession } from '../../utils/caseStudyAuth'

export default defineEventHandler((event): typeof i4pRdssStudy => {
  requireCaseStudySession(event, rdssCaseStudyAccess)
  setHeader(event, 'cache-control', 'private, no-store')
  return i4pRdssStudy
})
