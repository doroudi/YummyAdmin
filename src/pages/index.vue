<script lang="ts" setup>
const route = useRoute()
if (route.query.lang) {
  const lang = route.query.lang as string
  const layout = useLayoutStore()
  if (['en', 'ar', 'fa', 'de', 'tr', 'ch'].includes(lang))
    layout.changeLanguage(lang)
}

if (route.query.theme) {
  const theme = route.query.theme as string
  const layout = useLayoutStore()
  layout.setDarkTheme(theme === 'dark')
}
useRouter().replace('/dashboard/ecommerce')
</script>
