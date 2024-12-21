<script setup>
import {
  People16Regular as UserIcon,
} from '@vicons/fluent'

const { t } = useI18n()
</script>

<template>
  <div class="px-4">
    <h2 class="card-title">
      {{ t('categories.stat') }}
    </h2>
    <DashboardCard class="w-full sm:w-full md:w-full" :icon="UserIcon" title="Registers" no-shadow :progress="10" :value="250" />
    <DashboardCard class="w-full sm:w-full md:w-full" :icon="UserIcon" title="Registers" :progress="10" :value="250" />
    <DonutChart />
  </div>
</template>

<style lang="scss" scoped>
.card-title {
  font-size: 1rem;
}
</style>
