export default defineEventHandler((event): void => {
  if (import.meta.dev) {
    return
  }

  const path = getRequestURL(event).pathname

  if (path === '/api/i4p-rdss' || path.startsWith('/api/i4p-rdss/')) {
    throw createError({ statusCode: 404, statusMessage: 'Case study not found.' })
  }
})
