import { acceptHMRUpdate, defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', () => {
  const collapsed = ref(false)
  const activeLanguage = ref('en')

  function toggleSidebar() {
    collapsed.value = !collapsed.value
  }

  function changeLanguage(lang: string) {
    activeLanguage.value = lang
  }

  function toggleTheme() {
    toggleDark()
  }

  const isRtl = computed(() => {
    const { t } = useI18n()
    const dir = t('direction')
    return (dir && dir === 'rtl')
  })

  return {
    collapsed,
    toggleSidebar,
    toggleTheme,
    changeLanguage,
    isRtl,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useLayoutStore, import.meta.hot))
