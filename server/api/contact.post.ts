import { checkBotId } from 'botid/server'
import { Resend, type CreateEmailResponse } from 'resend'
import { z } from 'zod'

const ContactRequestSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(1).max(5000),
  privacyAcknowledged: z.literal(true)
})

type ContactRequest = z.infer<typeof ContactRequestSchema>

type ContactResponse = Readonly<{
  ok: true
}>

type ContactConfig = Readonly<{
  resendApiKey: string
  contactFrom: string
  contactTo: string
}>

const requiredConfigKeys = ['resendApiKey', 'contactFrom', 'contactTo'] as const

const isContactEnabled = (value: unknown): boolean => value === true || value === 'true'

const wait = async (duration: number): Promise<void> => {
  await new Promise<void>(resolve => {
    setTimeout(resolve, duration)
  })
}

const requireContactConfig = (config: ReturnType<typeof useRuntimeConfig>): ContactConfig => {
  const missingKeys = requiredConfigKeys.filter(key => !config[key])

  if (missingKeys.length > 0) {
    throw createError({
      statusCode: 503,
      statusMessage: `Contact form is missing required configuration: ${missingKeys.join(', ')}`
    })
  }

  return {
    resendApiKey: config.resendApiKey,
    contactFrom: config.contactFrom,
    contactTo: config.contactTo
  }
}

const createEmailText = (request: ContactRequest): string => [
  `Name: ${request.name}`,
  `Email: ${request.email}`,
  '',
  request.message
].join('\n')

const shouldRetryResend = (response: CreateEmailResponse): boolean => {
  if (!response.error) {
    return false
  }

  const statusCode = response.error.statusCode
  return statusCode === 429 || (typeof statusCode === 'number' && statusCode >= 500)
}

const sendContactEmail = async (
  resend: Resend,
  config: ContactConfig,
  request: ContactRequest,
  maxAttempts: number
): Promise<void> => {
  const idempotencyKey = crypto.randomUUID()
  let lastResponse: CreateEmailResponse | null = null

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const response = await resend.emails.send({
      from: config.contactFrom,
      to: config.contactTo,
      replyTo: request.email,
      subject: `Portfolio enquiry from ${request.name}`,
      text: createEmailText(request),
      tags: [
        {
          name: 'source',
          value: 'portfolio-contact'
        }
      ]
    }, {
      idempotencyKey
    })

    if (response.data) {
      return
    }

    lastResponse = response

    if (!shouldRetryResend(response) || attempt === maxAttempts) {
      break
    }

    console.warn({
      event: 'contact_email_retry',
      attempt,
      statusCode: response.error.statusCode,
      message: response.error.message
    })

    await wait(250 * attempt)
  }

  throw createError({
    statusCode: 502,
    statusMessage: `Resend failed to send the contact email: ${lastResponse?.error?.message ?? 'no response'}`
  })
}

export default defineEventHandler(async (event): Promise<ContactResponse> => {
  const runtimeConfig = useRuntimeConfig(event)

  if (!isContactEnabled(runtimeConfig.public.contactEnabled)) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Contact form is disabled'
    })
  }

  const verification = await checkBotId({
    advancedOptions: {
      checkLevel: 'basic'
    }
  })

  if (verification.isBot) {
    throw createError({
      statusCode: 403,
      statusMessage: 'BotID classified this request as automated'
    })
  }

  const body: unknown = await readBody(event)
  const parsedBody = ContactRequestSchema.safeParse(body)

  if (!parsedBody.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Contact form payload is invalid'
    })
  }

  const contactConfig = requireContactConfig(runtimeConfig)
  await sendContactEmail(new Resend(contactConfig.resendApiKey), contactConfig, parsedBody.data, 3)

  return { ok: true }
})
