import { initBotId } from 'botid/client/core'

export default defineNuxtPlugin((): void => {
  initBotId({
    protect: [
      {
        path: '/api/contact',
        method: 'POST',
        advancedOptions: {
          checkLevel: 'basic'
        }
      }
    ]
  })
})
