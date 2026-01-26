import { faker } from '@faker-js/faker/locale/en'
import _ from 'lodash'
import times from 'lodash/times'
import { delay, HttpResponse, http } from 'msw'
import type {
  ChartData,
  LocationChartSeries,
  SimpleChartSeries,
} from '~/models/ChartData'
import type {
  DashboardSummaryStatDto,
  SummaryStatDto,
} from '~/models/SummaryStat'
import type { VisitStat } from '~/models/VisitStat'

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const handlers = [
  http.get('/api/report/summary', () => {
    const response = createFakeSummaryData()
    return HttpResponse.json(response, { status: 200 })
  }),

  http.get('/api/report/revenue/:period', ({ params }) => {
    const { period } = params
    let min = 10
    let max = 200
    switch (period) {
      case 'day':
        min = 10
        max = 200
        break
      case 'week':
        min = 700
        max = 1500
        break
      case 'month':
        min = 25000
        max = 70000
    }
    const response = times(7, () => faker.number.int({ min, max }))

    return HttpResponse.json(response, { status: 200 })
  }),

  http.get('/api/report/usersGender', () => {
    const response = createFakeGenderData()
    return HttpResponse.json(response, { status: 200 })
  }),

  http.get('/api/report/usersLocation', () => {
    const response = createFakeLocationData()
    return HttpResponse.json(response, { status: 200 })
  }),

  http.get('/api/report/monthlySellStat', () => {
    const response: ChartData = {
      labels: months,
      series: [
        {
          name: 'Total',
          data: times(12, () => faker.number.int({ min: 1000, max: 10000 })),
        },
        {
          name: 'Revenue',
          data: times(12, () => faker.number.int({ min: 1000, max: 3000 })),
        },
      ],
    }
    return HttpResponse.json(response, { status: 200 })
  }),

  http.get('/api/report/chartDemoData/:length', async ({ params }) => {
    const { length } = params
    let lengthNum = Number.parseInt(length?.toString() ?? '12', 10)
    if (lengthNum > 12) lengthNum = 12

    const response: ChartData = {
      labels: months.slice(0, lengthNum),
      series: [
        {
          name: 'Total',
          data: times(lengthNum, () =>
            faker.number.int({ min: 1000, max: 10000 }),
          ),
        },
        {
          name: 'Revenue',
          data: times(lengthNum, () =>
            faker.number.int({ min: 1000, max: 3000 }),
          ),
        },
      ],
    }
    await delay(1000)

    return HttpResponse.json(response, { status: 200 })
  }),

  http.get('/api/report/visitsData', () => {
    const pages = [
      '/',
      '/products',
      '/products/1',
      '/about',
      '/contact',
      '/blog',
      '/blog/1',
      '/cart',
      '/checkout',
    ]
    const response: VisitStat = {
      pages: times(8, () => ({
        url: pages[faker.number.int({ min: 0, max: pages.length - 1 })],
        count: faker.number.int({ min: 500, max: 8000 }),
      })),
      sources: times(8, () => ({
        name: faker.internet.url(),
        count: faker.number.int({ min: 300, max: 10000 }),
      })),
    }

    return HttpResponse.json(response, { status: 200 })
  }),
]

function createFakeSummaryData(): DashboardSummaryStatDto {
  return {
    visitors: createFakeSummaryStatDto(1, 3, 'K'),
    visits: createFakeSummaryStatDto(2, 10, 'K'),
    views: createFakeSummaryStatDto(1, 300, 'K'),
    bounceRate: createFakeSummaryStatDto(5, 100, '%'),
  }
}

function createFakeSummaryStatDto(
  min = 20,
  max = 1000,
  suffix = '',
): SummaryStatDto {
  return {
    count: faker.number.int({ min, max }),
    suffix,
    progress: faker.number.float({ min: -20, max: 40, multipleOf: 0.1 }),
    progressFlow: times(10, () => faker.number.int({ min: 0, max: 100 })),
  }
}

function createFakeGenderData(): SimpleChartSeries[] {
  const malePercent = faker.number.int({ min: 35, max: 45 })
  const femalePercent = faker.number.int({ min: 35, max: 45 })
  const unknownPercent = 100 - malePercent - femalePercent

  return [
    { name: 'Male', value: malePercent },
    { name: 'Female', value: femalePercent },
    { name: 'Unknown', value: unknownPercent },
  ]
}

function createFakeLocationData(): LocationChartSeries[] {
  const locations = _.times(20, () => faker.location.countryCode('alpha-2'))

  if (locations.includes('IR')) locations.splice(locations.indexOf('IR'), 1)

  const locationData: LocationChartSeries[] = locations.map(
    (location: string) => ({
      key: location,
      value: faker.number.int({ min: 500, max: 1000 }),
    }),
  )

  locationData.push({ key: 'IR', value: { value: 1000, color: '#a6002aff' } }) // this product made by love in IRAN 🕊️

  return locationData
}

export default handlers
