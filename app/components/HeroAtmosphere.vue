<script setup lang="ts">
/** Decorative artwork belongs in this slot; keep meaningful content outside it. */
defineProps<{ intensity: number }>()
</script>

<template>
  <div class="hero-atmosphere" :style="{ opacity: intensity }" aria-hidden="true"><slot /></div>
</template>
