<script setup lang="ts">
import { darkTheme, lightTheme } from 'naive-ui'
import scrollbarRtl from 'naive-ui/es/_internal/scrollbar/styles/rtl'
import { alertRtl } from 'naive-ui/es/alert/styles'
import { buttonRtl } from 'naive-ui/es/button/styles'
import { dialogRtl } from 'naive-ui/es/dialog/styles'
import { drawerRtl } from 'naive-ui/es/drawer/styles'
import { inputRtl } from 'naive-ui/es/input/styles'
import { messageRtl } from 'naive-ui/es/message/styles'
import { tableRtl } from 'naive-ui/es/table/styles'
import { tagRtl } from 'naive-ui/es/tag/styles'

import themeOverrides, {
  darkThemeOverrides,
} from '~/common/theme/theme-overrides'
import useColors from './composables/useColors'

const layout = useLayoutStore()

const rtlStyles = [
  buttonRtl,
  tableRtl,
  inputRtl,
  messageRtl,
  alertRtl,
  scrollbarRtl,
  tagRtl,
  dialogRtl,
  drawerRtl,
]

const customTheme = ref({ ...themeOverrides })
const customDarkTheme = ref({ ...themeOverrides, ...darkThemeOverrides })
const { makeLighter } = useColors()

const activeTheme = ref(layout.isDark ? darkTheme : lightTheme)
watch(
  () => layout.isDark,
  (isDark: boolean) => {
    setTimeout(() => {
      activeTheme.value = isDark ? darkTheme : lightTheme
    }, 50)
  },
  { immediate: true },
)
const activeThemeOverrides = computed(() =>
  layout.isDark ? customDarkTheme.value : customTheme.value,
)

watch(
  () => layout.isRtl,
  () => {
    const body = document.querySelector('body') as HTMLElement
    if (layout.isRtl) body.classList.add('rtl')
    else body.classList.remove('rtl')
  },
  {
    immediate: true,
  },
)

onMounted(() =>
  setTimeout(() => {
    getToggleElementPosition()
  }, 200),
)

const transitionDone = ref(true)
watch(
  () => layout.isDark,
  (newValue: boolean) => {
    if (newValue) {
      transitionDone.value = false
      setTimeout(() => {
        document.documentElement.classList.add('dark')
        transitionDone.value = true
      }, 700)
    } else {
      transitionDone.value = false
      document.documentElement.classList.remove('dark')
      setTimeout(() => {
        transitionDone.value = true
      }, 1000)
    }
  },
  { immediate: true },
)

watch(
  () => layout.themeColor,
  (newValue: string) => {
    setThemeColor(newValue)
  },
  { immediate: true },
)

function setThemeColor(newValue: string) {
  if (newValue === '') return

  const shade1 = makeLighter(newValue, 0.8)
  const shade2 = makeLighter(newValue, 0.6)
  const shade3 = makeLighter(newValue, 0.4)
  document.documentElement.style.setProperty('--primary-color', newValue)
  document.documentElement.style.setProperty('--primary-color-shade1', shade1)
  document.documentElement.style.setProperty('--primary-color-shade2', shade2)
  document.documentElement.style.setProperty('--primary-color-shade3', shade3)
  if (!customTheme.value.common || !customDarkTheme.value.common) return

  customTheme.value.common.primaryColor = newValue
  customTheme.value.common.primaryColorHover = shade1
  customTheme.value.common.primaryColorPressed = shade2
  customTheme.value.common.primaryColorSuppl = shade3

  customDarkTheme.value.common.primaryColor = newValue
  customDarkTheme.value.common.primaryColorHover = shade1
  customDarkTheme.value.common.primaryColorPressed = shade2
  customDarkTheme.value.common.primaryColorSuppl = shade3

  customTheme.value.Button = {
    color: newValue,
    colorHover: shade1,
    colorPressed: shade2,
    colorFocus: shade3,
  }
  customDarkTheme.value.common.primaryColor = newValue
  customDarkTheme.value.Button = {
    color: newValue,
    colorHover: shade1,
    colorPressed: shade2,
    colorFocus: shade3,
  }
}
const toggleButtonPosition = ref<DOMRect>({ left: 0, top: 0 })
function getToggleElementPosition() {
  const element = document.querySelector('#theme-toggle') as HTMLElement
  const rect = element.getBoundingClientRect()

  toggleButtonPosition.value = {
    left: layout.isRtl ? 'auto' : `${rect.left + window.scrollX}px`,
    right: layout.isRtl ? `${window.innerWidth - rect.right}px` : 'auto',
    top: `${rect.top + window.scrollY}px`,
  }
}
</script>

<template>
  <n-config-provider inline-theme-disabled :theme="activeTheme" :theme-overrides="activeThemeOverrides"
    :rtl="layout.isRtl ? rtlStyles : []" :preflight-style-disabled="false">
    <n-notification-provider :placement="layout.isRtl ? 'bottom-left':'bottom-right'">
      <n-message-provider placement="bottom-right">
        <n-dialog-provider>
          <div class="dark-mode-container"
            :style="{ 'left': toggleButtonPosition.left, 'right': toggleButtonPosition.right, 'top': toggleButtonPosition.top }"
            :class="{ 'done': transitionDone }">
            <div class="dark-mode" :class="{ 'active': layout.isDark }"></div>
          </div>
          <RouterView />
          <SupportProject />
        </n-dialog-provider>
      </n-message-provider>
    </n-notification-provider>
  </n-config-provider>
</template>


<style scoped lang="scss">
.rtl {
  .dark-mode-container {
    right: auto;
  }
}

.dark-mode-container {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  z-index: 1;

  &.done {
    z-index: 0;
  }

  .dark-mode {
    position: relative;
    transform: scale(0);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 250vw;
    height: 250vw;
    border-radius: 50%;
    background: var(--background-dark);
    transition: 1000ms ease-in-out;
    display: flex;
    flex: 0 0 auto;

    &.active {
      transform: scale(1);
      transition: 1000ms ease-in-out;
    }
  }
}
</style>