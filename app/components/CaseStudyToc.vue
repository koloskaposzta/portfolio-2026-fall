<script setup lang="ts">
import type { CaseStudySection } from '~/data/caseStudies'

const props = defineProps<{
  sections: readonly Pick<CaseStudySection, 'id' | 'title'>[]
}>()

const activeId = ref<string>('')
const panelOpen = ref(false)
const mobileArea = ref<HTMLElement | null>(null)

let observer: IntersectionObserver | null = null

const handleEntries = (entries: IntersectionObserverEntry[]): void => {
  const visible = entries
    .filter(entry => entry.isIntersecting)
    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

  const first = visible[0]

  if (first) {
    activeId.value = first.target.id
  }
}

const observeSections = async (): Promise<void> => {
  observer?.disconnect()
  observer = null
  activeId.value = props.sections[0]?.id ?? ''
  await nextTick()

  if (typeof IntersectionObserver === 'undefined') {
    return
  }

  observer = new IntersectionObserver(handleEntries, {
    rootMargin: '-25% 0px -55% 0px',
    threshold: 0
  })

  props.sections.forEach(section => {
    const element = document.getElementById(section.id)

    if (element) {
      observer?.observe(element)
    }
  })
}

const onDocumentClick = (event: MouseEvent): void => {
  const area = mobileArea.value

  if (panelOpen.value && area && event.target instanceof Node && !area.contains(event.target)) {
    panelOpen.value = false
  }
}

const onKeydown = (event: KeyboardEvent): void => {
  if (event.key === 'Escape') {
    panelOpen.value = false
  }
}

watch(() => props.sections, observeSections)

onMounted(() => {
  void observeSections()
  document.addEventListener('click', onDocumentClick)
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
  document.removeEventListener('click', onDocumentClick)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <aside class="case-toc-shell">
    <nav class="case-toc" aria-label="On this page">
      <p class="case-toc__label type-label">On this page</p>
      <ul class="case-toc__list">
        <li v-for="section in sections" :key="section.id">
          <a
            class="case-toc__link type-caption"
            :class="{ 'case-toc__link--active': section.id === activeId }"
            :href="`#${section.id}`"
            :aria-current="section.id === activeId ? 'location' : undefined"
          >{{ section.title }}</a>
        </li>
      </ul>
    </nav>

    <div ref="mobileArea" class="case-toc-mobile">
      <button
        class="case-toc-mobile__button type-nav"
        type="button"
        aria-controls="case-toc-panel"
        :aria-expanded="panelOpen"
        @click="panelOpen = !panelOpen"
      >
        Contents <AppIcon :name="panelOpen ? 'chevron-up' : 'chevron-down'" />
      </button>
      <nav v-show="panelOpen" id="case-toc-panel" class="case-toc-mobile__panel" aria-label="On this page">
        <ul class="case-toc__list">
          <li v-for="section in sections" :key="section.id">
            <a
              class="case-toc__link type-caption"
              :class="{ 'case-toc__link--active': section.id === activeId }"
              :href="`#${section.id}`"
              :aria-current="section.id === activeId ? 'location' : undefined"
              @click="panelOpen = false"
            >{{ section.title }}</a>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>
