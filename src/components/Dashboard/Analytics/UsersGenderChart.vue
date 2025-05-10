<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { t } = useI18n()
const store = useDashboardStore()
onMounted(() => store.getGenderStat())
const { usersGenderData } = storeToRefs(store)
</script>

<template>
  <Card class="p-2" :title="t('dashboard.genderChart.title')">
    <DonutChart v-if="usersGenderData.length" :data="usersGenderData" />
  </Card>
</template>

<style scoped></style>
