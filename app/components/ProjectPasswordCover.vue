<script setup lang="ts">
const cover = ref<HTMLElement | null>(null)
const peeking = ref(false)
let preview: HTMLElement | null = null
let preference: MediaQueryList | null = null

const hidePeek = (): void => {
  peeking.value = false
}

const movePeek = (event: PointerEvent): void => {
  const element = cover.value
  if (!element || !preference?.matches || event.pointerType !== 'mouse') {
    hidePeek()
    return
  }

  const bounds = element.getBoundingClientRect()
  const inside = event.clientX >= bounds.left && event.clientX <= bounds.right
    && event.clientY >= bounds.top && event.clientY <= bounds.bottom
  peeking.value = inside
  if (!inside) return

  element.style.setProperty('--peek-x', `${event.clientX - bounds.left}px`)
  element.style.setProperty('--peek-y', `${event.clientY - bounds.top}px`)
}

onMounted(() => {
  preview = cover.value?.parentElement ?? null
  if (!preview) throw new Error('ProjectPasswordCover must be inside a project preview image.')

  preference = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
  preview.addEventListener('pointermove', movePeek)
  preview.addEventListener('pointerleave', hidePeek)
  preference.addEventListener('change', hidePeek)
})

onBeforeUnmount(() => {
  preview?.removeEventListener('pointermove', movePeek)
  preview?.removeEventListener('pointerleave', hidePeek)
  preference?.removeEventListener('change', hidePeek)
})
</script>

<template>
  <div ref="cover" class="project-password-cover" :class="{ 'project-password-cover--peeking': peeking }">
    <span class="type-label">Password protected</span>
  </div>
</template>

<style scoped>
.project-password-cover {
  position: absolute;
  inset: 7%;
  z-index: 1;
  display: grid;
  place-items: center;
  background: #000;
  color: #fff;
  text-align: center;
}

.project-password-cover--peeking {
  mask-image: radial-gradient(circle 44px at var(--peek-x) var(--peek-y), transparent 43px, #000 44px);
}
</style>
