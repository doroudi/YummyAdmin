import type { ApexOptions } from 'apexcharts'
import type { ChartData } from '~/models/ChartData'
import type { ChartProps } from '~/models/ChartsProps'

export function useChartOptions(props: ChartProps) {
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
    if (props.data?.series) {
      for (let i = 0; i < props.data?.series?.length; i++)
        result.push(makeLighter(props.colorScheme ?? '', 1 - i * 0.25))
    }

    return result
  })
  const defaultOptions = computed<ApexOptions>(() => {
    const baseOptions: ApexOptions = {
      chart: {
        stacked: true,
        type: props.type,
        toolbar: {
          show: false,
        },
        animations: {
          enabled: true,
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150,
          },
        },
        events: {
          click: () => {
            // emit('chart-click', event, chartContext, config)
          },
        },
      },
      grid: {
        padding: {
          top: -20,
          bottom: -10,
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      xaxis: {
        categories: safeLabels.value,
        labels: {
          style: {
            colors: '#6E6B7B',
            fontSize: '0.86rem',
            fontFamily: 'inherit',
          },
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      legend: {
        show: false,
        position: 'top',
        fontFamily: 'inherit',
        fontSize: '12px',
        labels: {
          colors: '#6E6B7B',
          useSeriesColors: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: colors.value,
      plotOptions: {
        bar: {
          columnWidth: '17%',
          borderRadius: 5,
          dataLabels: {
            position: 'top',
          },
        },
        // distributed: true,
      },
      yaxis: {
        labels: {
          style: {
            colors: '#6E6B7B',
            fontSize: '0.86rem',
            fontFamily: 'inherit',
          },
          formatter: (value: number) => {
            if (value >= 1000) {
              return `${(value / 1000).toFixed(1)}k`
            }
            return `${value}`
          },
        },
        forceNiceScale: true,
        tickAmount: 5,
        stepSize: 20,
      },
      tooltip: {
        theme: 'dark',
        style: {
          fontSize: '12px',
          fontFamily: 'inherit',
        },
        y: {
          formatter: (value: number) => `${value.toLocaleString()}`,
        },
      },
      responsive: [
        {
          breakpoint: 992,
          options: {
            plotOptions: {
              bar: {
                columnWidth: '29%',
                borderRadius: 3,
              },
            },
            chart: {
              height: 250,
            },
            yaxis: {
              labels: {
                show: true,
              },
            },
          },
        },
        {
          breakpoint: 576,
          options: {
            plotOptions: {
              bar: {
                columnWidth: '40%',
              },
            },
            chart: {
              height: 200,
            },
            xaxis: {
              labels: {
                rotate: -45,
                style: {
                  fontSize: '10px',
                },
              },
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

  const safeLabels = computed(() => {
    if (!props.data?.labels) return []
    try {
      return props.data.labels.map((label: any) =>
        label !== null && label !== undefined ? String(label) : '',
      )
    } catch {
      return []
    }
  })

  const safeSeries = computed(() => {
    if (!validateChartData(props.data)) return []

    try {
      return props.data!.series.map((series: any) => ({
        name: series.name || '',
        data: series.data.map((value: any) => {
          const num = Number(value)
          return Number.isNaN(num) ? 0 : num
        }),
        ...series,
      }))
    } catch {
      // emit('data-error', 'Failed to process series data')
      return []
    }
  })

  const showChart = computed(() => {
    return (
      !props.loading &&
      !props.error &&
      validateChartData(props.data) &&
      safeSeries.value.length > 0
    )
  })

  const validateChartData = (data: ChartData | null): boolean => {
    if (!data) return false
    if (!data.series || !Array.isArray(data.series) || data.series.length === 0)
      return false
    if (!data.labels || !Array.isArray(data.labels)) return false

    const hasValidSeries = data.series.every(
      (series: any) =>
        series && typeof series === 'object' && Array.isArray(series.data),
    )
    return hasValidSeries
  }

  watch(
    () => props.data,
    (newData: any) => {
      if (newData && !validateChartData(newData)) {
        // emit('data-error', 'Invalid chart data structure')
      }
    },
    { immediate: true },
  )

  return {
    defaultOptions,
    showChart,
    safeSeries,
    safeLabels,
    props,
    validateChartData,
  }
}
