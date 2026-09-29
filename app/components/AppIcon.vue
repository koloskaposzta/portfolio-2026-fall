<script setup lang="ts">
import arrowBack from '@material-symbols/svg-400/sharp/arrow_back.svg?raw'
import arrowDownward from '@material-symbols/svg-400/sharp/arrow_downward.svg?raw'
import keyboardArrowDown from '@material-symbols/svg-400/sharp/keyboard_arrow_down.svg?raw'
import keyboardArrowUp from '@material-symbols/svg-400/sharp/keyboard_arrow_up.svg?raw'
import northEast from '@material-symbols/svg-400/sharp/north_east.svg?raw'

const icons = {
  'arrow-back': arrowBack,
  'arrow-downward': arrowDownward,
  'chevron-down': keyboardArrowDown,
  'chevron-up': keyboardArrowUp,
  'north-east': northEast
} as const

defineProps<{
  name: keyof typeof icons
}>()
</script>

<template>
  <span class="app-icon" aria-hidden="true" v-html="icons[name]" />
</template>

<style>
.app-icon {
  display: inline-flex;
  align-items: center;
  align-self: center;
}

.app-icon svg {
  display: block;
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style>
