<script setup lang="ts">
/** Replace the slot with the final wordmark; its width remains controlled by the parent. */
defineProps<{ variant: 'header' | 'hero' }>()
</script>

<template>
  <span class="brand-wordmark" :data-variant="variant"><slot>Kolos Káposzta</slot></span>
</template>
