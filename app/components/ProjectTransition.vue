<script setup lang="ts">
/** A static navigation boundary until authored transition artwork is supplied. */
defineProps<{ from: string; to: string }>()
</script>

<template>
  <div class="project-transition" :data-from="from" :data-to="to"><slot /></div>
</template>
