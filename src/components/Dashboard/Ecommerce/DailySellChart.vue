<script setup lang="ts">
import type { ChartData } from '~/models/ChartData'

const { t } = useI18n()

const sells = [4800, 2140, 3200, 2702, 4201, 1887]
const data: ChartData = {
  labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'],
  series: [
    {
      name: 'Sell',
      data: sells,
    },
    {
      name: 'Revenue',
      data: sells.map((i) => i * Math.random()),
    },
  ],
}
</script>

<template>
    <Card class="p-2" :title="t('dashboard.sellChart.title')">
        <RadarChart height="320" :colors="['#FC0', '#2358EA']" :data="data" />
    </Card>
</template>