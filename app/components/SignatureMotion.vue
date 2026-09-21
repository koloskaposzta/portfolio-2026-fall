<script setup lang="ts">
/** Supply motion and a static alternative in the named slots; the parent sets dimensions. */
defineProps<{ name: string }>()
</script>

<template>
  <div class="signature-motion" :data-motion="name" aria-hidden="true">
    <div class="signature-motion__animated"><slot name="motion" /></div>
    <div class="signature-motion__static"><slot name="static" /></div>
  </div>
</template>
