import { createHash, createHmac, timingSafeEqual } from 'node:crypto'

type BoodaEvent = Parameters<typeof getCookie>[0]

const cookieName = 'booda_case_study'
const sessionMessage = 'booda-bike-case-study-session-v1'

const getPassword = (event: BoodaEvent): string => {
  const password = useRuntimeConfig(event).boodaCaseStudyPassword

  if (typeof password !== 'string' || password.length < 16) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Set NUXT_BOODA_CASE_STUDY_PASSWORD to at least 16 characters.'
    })
  }

  return password
}

const digest = (value: string): Buffer => createHash('sha256').update(value).digest()

const matches = (received: string, expected: string): boolean =>
  timingSafeEqual(digest(received), digest(expected))

const sessionToken = (password: string): string =>
  createHmac('sha256', password).update(sessionMessage).digest('hex')

const isLocalPreviewRequest = (event: BoodaEvent): boolean => {
  if (!import.meta.dev) {
    return false
  }

  const address = event.node.req.socket.remoteAddress
  return address === '::1' || address === '127.0.0.1' || address === '::ffff:127.0.0.1'
}

export const verifyBoodaCaseStudyPassword = (event: BoodaEvent, submittedPassword: string): void => {
  if (!matches(submittedPassword, getPassword(event))) {
    throw createError({ statusCode: 401, statusMessage: 'Incorrect case study password.' })
  }
}

export const setBoodaCaseStudySession = (event: BoodaEvent): void => {
  setCookie(event, cookieName, sessionToken(getPassword(event)), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/api/booda-bike',
    maxAge: 60 * 60 * 24 * 7
  })
}

export const requireBoodaCaseStudySession = (event: BoodaEvent): void => {
  if (isLocalPreviewRequest(event)) {
    return
  }

  const received = getCookie(event, cookieName)

  if (!received || !matches(received, sessionToken(getPassword(event)))) {
    throw createError({ statusCode: 401, statusMessage: 'Case study password required.' })
  }
}
