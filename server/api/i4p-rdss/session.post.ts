import { z } from 'zod'
import { rdssCaseStudyAccess, setCaseStudySession, verifyCaseStudyPassword } from '../../utils/caseStudyAuth'

const requestSchema = z.object({ password: z.string().min(1) })

export default defineEventHandler(async (event): Promise<{ authenticated: true }> => {
  setHeader(event, 'cache-control', 'private, no-store')
  const result = requestSchema.safeParse(await readBody(event))

  if (!result.success) {
    throw createError({ statusCode: 400, statusMessage: 'Enter a case study password.' })
  }

  verifyCaseStudyPassword(event, result.data.password)
  setCaseStudySession(event, rdssCaseStudyAccess)
  return { authenticated: true }
})
