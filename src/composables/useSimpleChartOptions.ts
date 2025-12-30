import type { ApexOptions } from 'apexcharts'
import type { SimpleChartSeries } from '~/models/ChartData'
import type { SimpleChartProps } from '~/models/ChartsProps'

export function useSimpleChartOptions(props: SimpleChartProps) {
  const { makeLighter } = useColors()

  const colors = computed(() => {
    if (!props.colorScheme && !props.colors)
      return [
        'var(--primary-color)',
        'var(--primary-color-shade1)',
        'var(--primary-color-shade2)',
        'var(--primary-color-shade3)',
      ]

    if (props.colors && props.colors.length > 0) return props.colors

    const result = []
    if (props.data?.length) {
      for (let i = 0; i < props.data?.length; i++)
        result.push(makeLighter(props.colorScheme ?? '', 1 - i * 0.25))
    }

    return result
  })

  const labels = computed(() => props.data?.map((item: any) => item.name))
  const safeSeries = computed(() => props.data?.map((item: any) => item.value))
  const defaultOptions = computed<ApexOptions>(() => {
    const baseOptions: ApexOptions = {
      chart: {
        type: props.type,
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
      labels: labels.value,
      stroke: {
        width: 0,
        show: false,
        curve: 'smooth',
        lineCap: 'round',
      },
      colors: colors.value,
      grid: {
        padding: {
          right: -20,
          bottom: -8,
          left: -20,
        },
      },
      plotOptions: {
        pie: {
          //   borderRadius: 10,
          startAngle: -20,
          donut: {
            // borderRadius: { size: 10 },
            labels: {
              show: true,
              name: {
                offsetY: 15,
              },
              value: {
                offsetY: -15,
                formatter(t: string): any {
                  return Number.parseInt(t, 10).toString()
                },
              },
              total: {
                show: true,
                // offsetY: 15,
                label: 'Total',
                formatter(): string {
                  return (
                    safeSeries.value?.reduce(
                      (acc: number, item: any) => acc + item,
                      0,
                    ) ?? 0
                  ).toString()
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
      noData: {
        text: 'No data available',
        align: 'center',
        verticalAlign: 'middle',
        style: {
          color: '#6E6B7B',
          fontSize: '14px',
          fontFamily: 'inherit',
        },
      },
    }
    return baseOptions
  })

  const showChart = computed(() => {
    return !props.loading && !props.error && props.data?.length
  })

  const validateChartData = () => true

  watch(
    () => props.data,
    (newData: SimpleChartSeries[]) => {
      if (newData && newData.length === 0) {
        // emit('data-error', 'Invalid chart data structure')
      }
    },
    { immediate: true },
  )

  return {
    defaultOptions,
    showChart,
    safeSeries,
    safeLabels: labels,
    props,
    validateChartData,
  }
}
