import { acceptHMRUpdate, defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', () => {
  const collapsed = ref(false)
  const forceCollapsed = ref(false)
  const activeLanguage = ref('en')
  const isRtl = ref(false)
  const { t, locale } = useI18n()

  watch(() => useWindowSize().width.value, (newValue: number) => {
    forceCollapsed.value = newValue < 1000
  })
  function toggleSidebar() {
    collapsed.value = !collapsed.value
  }

  function toggleTheme() {
    toggleDark()
  }

  function changeLanguage(lang: string) {
    activeLanguage.value = lang
    locale.value = lang
    const dir = t('direction')
    isRtl.value = (dir !== null && dir === 'rtl')
  }

  return {
    collapsed,
    toggleSidebar,
    toggleTheme,
    isRtl,
    activeLanguage,
    changeLanguage,
    forceCollapsed,
  }
}, { persist: true })

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useLayoutStore, import.meta.hot))
