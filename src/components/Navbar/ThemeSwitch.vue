<script setup lang='ts'>
const layout = useLayoutStore()
const { t } = useI18n()
</script>

<template>
  <div v-bind="$attrs">
    <n-tooltip placement="top" trigger="hover">
      <template #trigger>
        <n-button quaternary circle @click="layout.toggleTheme()" class="theme-toggle"
          :class="{ 'theme-toggle--toggled': layout.isDark }">
          <template #icon>
            <NIcon size="1.4rem">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="1em" height="1em" fill="currentColor"
                class="theme-toggle__expand" viewBox="0 0 32 32">
                <clipPath id="theme-toggle__expand__cutout">
                  <path d="M0-11h25a1 1 0 0017 13v30H0Z" />
                </clipPath>
                <g clip-path="url(#theme-toggle__expand__cutout)">
                  <circle cx="16" cy="16" r="8.4" />
                  <path
                    d="M18.3 3.2c0 1.3-1 2.3-2.3 2.3s-2.3-1-2.3-2.3S14.7.9 16 .9s2.3 1 2.3 2.3zm-4.6 25.6c0-1.3 1-2.3 2.3-2.3s2.3 1 2.3 2.3-1 2.3-2.3 2.3-2.3-1-2.3-2.3zm15.1-10.5c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zM3.2 13.7c1.3 0 2.3 1 2.3 2.3s-1 2.3-2.3 2.3S.9 17.3.9 16s1-2.3 2.3-2.3zm5.8-7C9 7.9 7.9 9 6.7 9S4.4 8 4.4 6.7s1-2.3 2.3-2.3S9 5.4 9 6.7zm16.3 21c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zm2.4-21c0 1.3-1 2.3-2.3 2.3S23 7.9 23 6.7s1-2.3 2.3-2.3 2.4 1 2.4 2.3zM6.7 23C8 23 9 24 9 25.3s-1 2.3-2.3 2.3-2.3-1-2.3-2.3 1-2.3 2.3-2.3z" />
                </g>
              </svg>
            </NIcon>
          </template>
        </n-button>
      </template>
      <span>{{ t('button.toggle_dark') }}</span>
    </n-tooltip>
  </div>
</template>

<style scoped lang='scss'>
.theme-toggle.theme-toggle--reversed .theme-toggle__expand {
  transform: scale(-1, 1)
}

.theme-toggle {
  --theme-toggle__expand--duration: 500ms
}

.theme-toggle__expand g circle,
.theme-toggle__expand g path {
  transform-origin: center;
  transition: transform calc(var(--theme-toggle__expand--duration) * .65) cubic-bezier(0, 0, 0, 1.25) calc(var(--theme-toggle__expand--duration) * .35)
}

.theme-toggle__expand :first-child path {
  transition-property: transform, d;
  transition-duration: calc(var(--theme-toggle__expand--duration) * .6);
  transition-timing-function: cubic-bezier(0, 0, 0.5, 1)
}

.theme-toggle input[type=checkbox]:checked~.theme-toggle__expand g circle,
.theme-toggle--toggled:not(label).theme-toggle .theme-toggle__expand g circle {
  transform: scale(1.4);
  transition-delay: 0s
}

.theme-toggle input[type=checkbox]:checked~.theme-toggle__expand g path,
.theme-toggle--toggled:not(label).theme-toggle .theme-toggle__expand g path {
  transform: scale(.75);
  transition-delay: 0s
}

.theme-toggle--toggled:not(label).theme-toggle .theme-toggle__expand :first-child path {
  d: path("M-9 3h25a1 1 0 0017 13v30H0Z");
  transition-delay: calc(var(--theme-toggle__expand--duration) * 0.4);
  transition-timing-function: cubic-bezier(0, 0, 0, 1.25)
}

@supports not (d:path("")) {
  .theme-toggle--toggled:not(label).theme-toggle .theme-toggle__expand :first-child path {
    transform: translate3d(-9px, 14px, 0)
  }
}

.theme-toggle {
  border: none;
  background: 0 0;
  cursor: pointer
}

.theme-toggle input[type=checkbox] {
  display: none
}

.theme-toggle .theme-toggle-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0
}

@media (prefers-reduced-motion:reduce) {
  .theme-toggle:not(.theme-toggle--force-motion) * {
    transition: none !important
  }
}
</style>
