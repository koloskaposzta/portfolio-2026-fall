<script setup lang="ts">
const cursor = ref<HTMLElement | null>(null)
const label = ref('')
const expanded = ref(false)
const route = useRoute()
const active = ref(false)

onMounted(() => {
  const preference = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
  const magneticSelector = '.site-nav a, .footer-links a, .text-link, .action-link, .editorial-hero__down'
  let magnetic: HTMLElement | null = null
  let frame = 0
  let pointerX = 0
  let pointerY = 0

  const resetMagnet = (): void => {
    magnetic?.style.removeProperty('translate')
    magnetic = null
  }

  const hide = (): void => {
    active.value = false
    document.documentElement.classList.remove('signature-cursor-active')
    window.cancelAnimationFrame(frame)
    frame = 0
    resetMagnet()
  }

  const renderPointer = (): void => {
    frame = 0
    const target = document.elementFromPoint(pointerX, pointerY)
    const link = target?.closest('a, button')
    const editable = target?.closest('input, textarea, select, [contenteditable="true"]')

    if (!target || editable) {
      hide()
      return
    }

    label.value = target.closest('[data-cursor="drag"]') ? 'DRAG'
      : link?.matches('.project-card__link, .next-project') && !target.closest('.text-link') ? 'VIEW'
      : link?.matches('[target="_blank"], [href^="mailto:"]') ? '↗' : ''
    expanded.value = Boolean(link || label.value)
    cursor.value?.style.setProperty('translate', `${pointerX}px ${pointerY}px`)
    active.value = true
    document.documentElement.classList.add('signature-cursor-active')

    const nextMagnetic = target.closest<HTMLElement>(magneticSelector)
    if (nextMagnetic !== magnetic) {
      resetMagnet()
      magnetic = nextMagnetic
    }

    if (magnetic) {
      const bounds = magnetic.getBoundingClientRect()
      const x = Math.max(-4, Math.min(4, (pointerX - bounds.left - bounds.width / 2) * 0.12))
      const y = Math.max(-4, Math.min(4, (pointerY - bounds.top - bounds.height / 2) * 0.12))
      magnetic.style.setProperty('translate', `${x}px ${y}px`)
    }
  }

  const move = (event: PointerEvent): void => {
    if (!preference.matches || event.pointerType !== 'mouse') {
      hide()
      return
    }
    pointerX = event.clientX
    pointerY = event.clientY
    if (!frame) frame = window.requestAnimationFrame(renderPointer)
  }

  const keyboard = (event: KeyboardEvent): void => {
    if (event.key === 'Tab') hide()
  }

  const scroll = (): void => {
    resetMagnet()
    if (active.value && !frame) frame = window.requestAnimationFrame(renderPointer)
  }

  const stopRouteWatch = watch(() => route.fullPath, hide)
  window.addEventListener('pointermove', move, { passive: true })
  document.documentElement.addEventListener('pointerleave', hide)
  window.addEventListener('blur', hide)
  window.addEventListener('scroll', scroll, { passive: true })
  window.addEventListener('keydown', keyboard)
  preference.addEventListener('change', hide)

  onBeforeUnmount(() => {
    hide()
    stopRouteWatch()
    window.removeEventListener('pointermove', move)
    document.documentElement.removeEventListener('pointerleave', hide)
    window.removeEventListener('blur', hide)
    window.removeEventListener('scroll', scroll)
    window.removeEventListener('keydown', keyboard)
    preference.removeEventListener('change', hide)
  })
})
</script>

<template>
  <Teleport to="body">
    <div ref="cursor" class="signature-cursor" :class="{ 'signature-cursor--active': active, 'signature-cursor--expanded': expanded }" aria-hidden="true">
      {{ label }}
    </div>
  </Teleport>
</template>

<style>
.signature-cursor {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: grid;
  width: 20px;
  height: 20px;
  place-items: center;
  border-radius: 50%;
  color: #000;
  background: #fff;
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  pointer-events: none;
  mix-blend-mode: difference;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: width 160ms ease, height 160ms ease, opacity 100ms ease;
}

@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .signature-cursor-active,
  .signature-cursor-active * {
    cursor: none !important;
  }

  .signature-cursor--active {
    opacity: 1;
  }

  .signature-cursor--expanded {
    width: 64px;
    height: 64px;
  }

  :is(.site-nav a, .footer-links a, .text-link, .action-link, .editorial-hero__down) {
    transition: color 160ms ease, background 160ms ease, translate 160ms ease;
  }
}
</style>
