<script setup>
import {
  People16Regular as UserIcon,
} from '@vicons/fluent'
</script>

<template>
  <div class="px-4">
    <h2 class="card-title">
      Statics
    </h2>
    <DashboardCard class="w-full sm:w-full md:w-full" :icon="UserIcon" title="Registers" :progress="10" :value="250" />
    <DashboardCard class="w-full sm:w-full md:w-full" :icon="UserIcon" title="Registers" :progress="10" :value="250" />
    <DonutChart />
  </div>
</template>

<style lang="scss" scoped>
.card-title {
    font-size: 1rem;
}
</style>
