<script setup lang="ts">
import type { ChartData } from '../../../models/ChartData'

const { t } = useI18n()

const chartData: ChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  series: [
    {
      name: 'series-1',
      data: [30, 40, 35, 50, 49, 6, 70],
    },
    {
      name: 'series-2',
      data: [3, 4, 15, 5, 4, 60, 10],
    },
  ],
}
const colors = ['var(--primary-color)', 'var(--primary-color-shade1)']
</script>

<template>
  <div class="p-2">
    <Card stretch-height title-size="normal" :title="t('dashboard.visits')">
      <BarChart :height="300" :data="chartData" :colors="colors" />
    </Card>
  </div>
</template>

<style lang="scss">

</style>
