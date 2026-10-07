export const analyticsEvents = {
  caseStudy50: 'case_study_50',
  caseStudyAccessRequest: 'case_study_access_request',
  caseStudyNext: 'case_study_next',
  caseStudyUnlocked: 'case_study_unlocked',
  caseStudyWalkthrough: 'case_study_walkthrough',
  contactClick: 'contact_click',
  contactFormSent: 'contact_form_sent',
  externalProjectClick: 'external_project_click',
  homeSectionView: 'home_section_view'
} as const

type AnalyticsEvent = typeof analyticsEvents[keyof typeof analyticsEvents]

type UmamiWindow = Window & {
  umami?: { track: (eventName: AnalyticsEvent, data?: Readonly<{ section: string }>) => void }
}

export const trackAnalyticsEvent = (eventName: AnalyticsEvent): boolean => {
  const tracker = (window as UmamiWindow).umami

  if (!tracker) {
    return false
  }

  tracker.track(eventName)
  return true
}

export const trackHomeSectionView = (sectionId: string): boolean => {
  const tracker = (window as UmamiWindow).umami

  if (!tracker) {
    return false
  }

  tracker.track(analyticsEvents.homeSectionView, { section: sectionId })
  return true
}
