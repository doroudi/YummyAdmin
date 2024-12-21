import { acceptHMRUpdate, defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', () => {
  const collapsed = ref(false)
  const forceCollapsed = ref(false)
  const activeLanguage = ref('en')
  const isRtl = ref(false)
  const { t, locale } = useI18n()
  const themeColor = ref('#00ad4c')
  const isDark = ref(false)

  const dialogPlacement = computed(() => isRtl.value ? 'left' : 'right')
  watch(() => useWindowSize().width.value, (newValue: number) => {
    forceCollapsed.value = newValue < 1000
  })

  function toggleSidebar() {
    collapsed.value = !collapsed.value
  }

  function toggleTheme() {
    isDark.value = !isDark.value
  }

  function changeLanguage(lang: string) {
    activeLanguage.value = lang
    locale.value = lang
    const dir = t('direction')
    isRtl.value = (dir !== null && dir === 'rtl')
  }

  function setThemeColor(color: string) {
    themeColor.value = color
  }

  return {
    collapsed,
    toggleSidebar,
    toggleTheme,
    isRtl,
    activeLanguage,
    changeLanguage,
    forceCollapsed,
    isDark,
    setThemeColor,
    themeColor,
    dialogPlacement,
  }
}, { persist: true })

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useLayoutStore, import.meta.hot))
