import { initBotId } from 'botid/client/core'

export default defineNuxtPlugin({
  enforce: 'pre',
  setup(): void {
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
  }
})
