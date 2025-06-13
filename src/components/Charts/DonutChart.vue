<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'

interface Props {
  data: any[]
  colorScheme?: string
  showLegend?: boolean
  legendPosition?: 'bottom' | 'right' | 'left'
}
const props = withDefaults(defineProps<Props>(), {
  showLegend: true,
  legendPosition: 'bottom',
})

const { makeLighter } = useColors()

const labels = computed(() => props.data.map((item: any) => item.name))
const values = computed(() => props.data.map((item: any) => item.value))
const colors = computed(() => {
  if (!props.colorScheme)
    return [
      'var(--primary-color)',
      'var(--primary-color-shade1)',
      'var(--primary-color-shade2)',
      'var(--primary-color-shade3)',
    ]

  const result = []
  for (let i = 0; i < props.data.length; i++)
    result.push(makeLighter(props.colorScheme, 1 - i * 0.25))

  return result
})
const donutChartOptions = ref({
  chart: {
    type: 'donut',
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: props.showLegend,
    position: props.legendPosition,
    formatter: (value: any, opts: any): any => {
      return `${value} - ${opts.w.globals.series[opts.seriesIndex]}`
    },
    markers: {
      onClick: undefined,
      offsetX: 0,
      offsetY: 0,
    },
  },
  labels,
  stroke: {
    width: 0,
    show: false,
    curve: 'smooth',
    lineCap: 'round',
  },
  colors,
  grid: {
    padding: {
      right: -20,
      bottom: -8,
      left: -20,
    },
  },
  plotOptions: {
    pie: {
      borderRadius: 10,
      startAngle: -20,
      donut: {
        borderRadius: 10,
        labels: {
          show: true,
          name: {
            offsetY: 15,
          },
          value: {
            offsetY: -15,
            formatter(t: string): any {
              return Number.parseInt(t).toString()
            },
          },
          total: {
            show: true,
            offsetY: 15,
            label: 'Total',
            formatter() {
              return props.data.reduce(
                (acc: number, item: any) => acc + item.value,
                0,
              )
            },
          },
        },
      },
    },
  },
  responsive: [
    {
      breakpoint: 1325,
      options: {
        chart: {
          height: 150,
        },
      },
    },
    {
      breakpoint: 1200,
      options: {
        chart: {
          height: 120,
        },
      },
    },
    {
      breakpoint: 1045,
      options: {
        chart: {
          height: 200,
        },
      },
    },
    {
      breakpoint: 992,
      options: {
        chart: {
          height: 250,
        },
      },
    },
  ],
})
</script>

<template>
  <VueApexCharts :series="values" height="220" :options="donutChartOptions" />
</template>

<style lang="scss" scoped>

</style>
