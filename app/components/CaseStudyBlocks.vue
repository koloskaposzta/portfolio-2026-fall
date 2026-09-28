<script setup lang="ts">
import { analyticsEvents } from '~/config/analytics'
import type { CaseStudyBlock } from '~/data/caseStudies'

defineProps<{
  blocks: readonly CaseStudyBlock[]
}>()
</script>

<template>
  <template v-for="(block, blockIndex) in blocks" :key="blockIndex">
    <p v-if="block.kind === 'paragraph'" class="type-body">{{ block.text }}</p>
    <h3 v-else-if="block.kind === 'heading'" class="type-heading-sm">{{ block.text }}</h3>
    <h4 v-else-if="block.kind === 'subheading'" class="type-body-lg">{{ block.text }}</h4>
    <ul v-else-if="block.kind === 'list'" class="case-points type-body">
      <li v-for="item in block.items" :key="item">{{ item }}</li>
    </ul>
    <blockquote v-else-if="block.kind === 'quote'" class="type-quote">{{ block.text }}</blockquote>
    <p v-else-if="block.kind === 'link'" class="type-body"><a :href="block.href" target="_blank" rel="noopener noreferrer" :data-umami-event="analyticsEvents.externalProjectClick">{{ block.text }}</a></p>
    <details v-else-if="block.kind === 'toggle'" class="case-toggle">
      <summary class="case-toggle__summary">
        <span class="case-toggle__icon" aria-hidden="true" />
        <span class="case-toggle__title">{{ block.title }}</span>
      </summary>
      <div class="case-toggle__body">
        <CaseStudyBlocks :blocks="block.blocks" />
      </div>
    </details>
  </template>
</template>
