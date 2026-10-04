import { z } from 'zod'
import { setBoodaCaseStudySession, verifyBoodaCaseStudyPassword } from '../../utils/boodaCaseStudyAuth'

const requestSchema = z.object({ password: z.string().min(1) })

export default defineEventHandler(async (event): Promise<{ authenticated: true }> => {
  setHeader(event, 'cache-control', 'private, no-store')
  const result = requestSchema.safeParse(await readBody(event))

  if (!result.success) {
    throw createError({ statusCode: 400, statusMessage: 'Enter a case study password.' })
  }

  verifyBoodaCaseStudyPassword(event, result.data.password)
  setBoodaCaseStudySession(event)
  return { authenticated: true }
})
