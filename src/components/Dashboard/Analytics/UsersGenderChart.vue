<script setup lang="ts">
const { t } = useI18n()
const store = useAnalyticsDashboardStore()
onMounted(() => store.getGenderStat())
</script>

<template>
  <Card class="p-2" :title="t('dashboard.genderChart.title')">
    <PolarChart height="250" :colors="['#2986cc','#c90076','#CCC',]" :data="store.usersGenderData" />
  </Card>
</template>