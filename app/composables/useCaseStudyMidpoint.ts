import type { Ref } from 'vue'
import { analyticsEvents, trackAnalyticsEvent } from '~/config/analytics'

export const useCaseStudyMidpoint = (articleBody: Ref<HTMLElement | null>): (() => Promise<void>) => {
  const midpointTracked = ref(false)

  const trackReadingMidpoint = (): void => {
    const body = articleBody.value

    if (!body || midpointTracked.value) {
      return
    }

    const bodyTop = window.scrollY + body.getBoundingClientRect().top
    const midpoint = bodyTop + body.offsetHeight / 2

    if (window.scrollY >= midpoint) {
      midpointTracked.value = trackAnalyticsEvent(analyticsEvents.caseStudy50)
    }
  }

  const resetReadingMidpoint = async (): Promise<void> => {
    midpointTracked.value = false
    await nextTick()
    window.requestAnimationFrame(trackReadingMidpoint)
  }

  onMounted(() => {
    window.addEventListener('scroll', trackReadingMidpoint, { passive: true })
    window.addEventListener('resize', trackReadingMidpoint)
    trackReadingMidpoint()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', trackReadingMidpoint)
    window.removeEventListener('resize', trackReadingMidpoint)
  })

  return resetReadingMidpoint
}
