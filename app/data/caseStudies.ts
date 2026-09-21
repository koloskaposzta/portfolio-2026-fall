import { hiddenJamSections } from './hiddenJam'
import { learningToSeeSections } from './learningToSee'

export type CaseStudyFigure = Readonly<{
  src: string
  alt: string
  caption: string
}>

export type CaseStudyBlock = Readonly<
  | { kind: 'paragraph'; text: string }
  | { kind: 'heading'; text: string }
  | { kind: 'subheading'; text: string }
  | { kind: 'list'; items: readonly string[] }
  | { kind: 'quote'; text: string }
  | { kind: 'link'; text: string; href: string }
>

export type CaseStudySection = Readonly<{
  id: string
  title: string
  blocks: readonly CaseStudyBlock[]
  figure?: CaseStudyFigure
}>

export type CaseStudy = Readonly<{
  slug: string
  title: string
  category: string
  summary: string
  context: string
  contribution: string
  cover: CaseStudyFigure
  sourceUrl: string
  liveUrl?: string
  sections: readonly CaseStudySection[]
}>

export const caseStudies: readonly CaseStudy[] = [
  {
    slug: 'learning-to-see',
    title: 'Learning to See',
    category: 'Independent project · Product design & development',
    summary: 'Turning passive visual inspiration into an active learning experience through writing and feedback.',
    context: 'A self-directed UX challenge about learning graphic design online.',
    contribution: 'Product concept, interaction design, interface design and development.',
    cover: {
      src: '/work/learning-cover.png',
      alt: 'Collage of posters, writing prompts and feedback screens from Learning to See',
      caption: 'Learning to See — project overview'
    },
    sourceUrl: 'https://koloskaposzta.super.site/get-to-know-me/learning-to-see',
    liveUrl: 'https://game-w.vercel.app/',
    sections: learningToSeeSections
  },
  {
    slug: 'hidden-jam',
    title: 'Hidden Jam',
    category: 'MOME Open · Team project',
    summary: 'Helping travellers find local experiences that match their interests, beyond familiar tourist routes.',
    context: 'A Digital Product Design course project at MOME Open.',
    contribution: 'Research, ideation, prototyping, testing and UI design with the project team.',
    cover: {
      src: '/work/hidden-cover.jpg',
      alt: 'Angled Hidden Jam travel app screens with Explore, Taste and Local Jam features',
      caption: 'Hidden Jam — concept screens'
    },
    sourceUrl: 'https://koloskaposzta.super.site/get-to-know-me/hidden-jam-case-study',
    sections: hiddenJamSections
  }
]

export const getNextCaseStudy = (slug: string): CaseStudy => {
  const index = caseStudies.findIndex(study => study.slug === slug)

  if (index < 0) {
    throw new Error(`Cannot find the next case study for slug: ${slug}`)
  }

  const nextStudy = caseStudies[(index + 1) % caseStudies.length]

  if (!nextStudy) {
    throw new Error('Cannot find the next case study because the case study list is empty.')
  }

  return nextStudy
}
