import { acceptHMRUpdate, defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', () => {
  const { t, locale } = useI18n()
  const collapsed = ref(false)
  const forceCollapsed = ref(false)
  const mobileMenuClosed = ref(true)
  const mobileMode = ref(false)
  const activeLanguage = ref('en')
  const isRtl = ref(false)
  const themeColor = ref('#00ad4c')
  const isDark = ref(false)
  const isWelcomeShown = ref(false)

  const dialogPlacement = computed(() => isRtl.value ? 'left' : 'right')

  watch(() => useWindowSize().width.value, (newValue: number) => {
    forceCollapsed.value = newValue <= 1024
    mobileMode.value = newValue < 600
  }, { immediate: true })

  function toggleSidebar() {
    if (mobileMode.value)
      mobileMenuClosed.value = false
    else
      collapsed.value = !collapsed.value
  }

  function closeSidebar() {
    mobileMenuClosed.value = true
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

  function showWelcome() {
    isWelcomeShown.value = true
  }

  function $reset() {
    mobileMode.value = false
  }

  return {
    collapsed,
    forceCollapsed,
    mobileMode,
    toggleSidebar,
    toggleTheme,
    isRtl,
    activeLanguage,
    changeLanguage,
    isDark,
    setThemeColor,
    themeColor,
    dialogPlacement,
    isWelcomeShown,
    showWelcome,
    closeSidebar,
    $reset,
    mobileMenuClosed,
  }
}, { persist: true })

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useLayoutStore, import.meta.hot))
