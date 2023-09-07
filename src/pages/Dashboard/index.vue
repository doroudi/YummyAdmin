<script setup lang="ts">
import {
  Cart16Regular as BasketIcon,
  Box16Regular as BoxIcon,
  DataTrending16Regular as StatIcon,
  People16Regular as UserIcon,
} from '@vicons/fluent'
</script>

<template>
  <div class="margin-outside flex pb-3">
    <DashboardCard class="w-1/5" :icon="UserIcon" title="Registers" :progress="10" :value="250" />
    <DashboardCard class="w-1/5" :icon="BoxIcon" title="Products" :progress="10" :value="3600" />
    <DashboardCard class="w-1/5" :icon="BasketIcon" title="Sells" :progress="-50" :value="5000" />
    <DashboardCard class="w-1/5" :icon="StatIcon" title="Visits" :progress="-1" :value="1500" />
    <DashboardCard class="w-1/5" :icon="StatIcon" title="Visits" :progress="-1" :value="1500" />
  </div>
</template>

<style scoped></style>
