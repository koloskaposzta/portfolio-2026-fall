import { createHash, createHmac, timingSafeEqual } from 'node:crypto'

type CaseStudyEvent = Parameters<typeof getCookie>[0]
type CaseStudyAccess = Readonly<{
  cookieName: string
  cookiePath: string
  sessionMessage: string
}>

export const boodaCaseStudyAccess: CaseStudyAccess = {
  cookieName: 'booda_case_study',
  cookiePath: '/api/booda-bike',
  sessionMessage: 'booda-bike-case-study-session-v1'
}

export const rdssCaseStudyAccess: CaseStudyAccess = {
  cookieName: 'rdss_case_study',
  cookiePath: '/api/i4p-rdss',
  sessionMessage: 'i4p-rdss-case-study-session-v1'
}

const getPassword = (event: CaseStudyEvent): string => {
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

const sessionToken = (password: string, access: CaseStudyAccess): string =>
  createHmac('sha256', password).update(access.sessionMessage).digest('hex')

const isLocalPreviewRequest = (event: CaseStudyEvent): boolean => {
  if (!import.meta.dev) {
    return false
  }

  return getRequestURL(event).hostname === 'localhost'
}

export const verifyCaseStudyPassword = (event: CaseStudyEvent, submittedPassword: string): void => {
  if (!matches(submittedPassword, getPassword(event))) {
    throw createError({ statusCode: 401, statusMessage: 'Incorrect case study password.' })
  }
}

export const setCaseStudySession = (event: CaseStudyEvent, access: CaseStudyAccess): void => {
  setCookie(event, access.cookieName, sessionToken(getPassword(event), access), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: access.cookiePath,
    maxAge: 60 * 60 * 24 * 7
  })
}

export const requireCaseStudySession = (event: CaseStudyEvent, access: CaseStudyAccess): void => {
  if (isLocalPreviewRequest(event)) {
    return
  }

  const received = getCookie(event, access.cookieName)

  if (!received || !matches(received, sessionToken(getPassword(event), access))) {
    throw createError({ statusCode: 401, statusMessage: 'Case study password required.' })
  }
}
