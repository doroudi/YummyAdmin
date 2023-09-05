import { acceptHMRUpdate, defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', () => {
  const collapsed = ref(false)
  const activeLanguage = ref('English')
  const isRtl = ref(false)
  const { t, locale } = useI18n()

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
  }
}, {
  persist: true,
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useLayoutStore, import.meta.hot))
