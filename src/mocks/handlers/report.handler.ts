import { faker } from '@faker-js/faker/locale/en'
import _ from 'lodash'
import times from 'lodash/times'
import { http, HttpResponse } from 'msw'
import type {
  ChartData,
  DonutChartSeries,
  LocationChartSeries,
} from '~/models/ChartData'
import type {
  DashboardSummaryStatDto,
  SummaryStatDto,
} from '~/models/SummaryStat'

const handlers = [
  http.get('/api/report/summary', () => {
    const response = createFakeSummaryData()
    return HttpResponse.json(response, { status: 200 })
  }),

  http.get('/api/report/revenue/:period', (req) => {
    const response = times(10, () =>
      faker.number.int({ min: 1000, max: 10000 }),
    )

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
      labels: [
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
      ],
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
]

function createFakeSummaryData(): DashboardSummaryStatDto {
  return {
    products: createFakeSummaryStatDto(),
    registers: createFakeSummaryStatDto(),
    sells: createFakeSummaryStatDto(),
    visits: createFakeSummaryStatDto(),
  }
}

function createFakeSummaryStatDto(): SummaryStatDto {
  return {
    count: faker.number.int({ min: 100, max: 1000 }),
    progress: faker.number.float({ min: -20, max: 40, multipleOf: 0.1 }),
    progressFlow: times(10, () => faker.number.int({ min: 0, max: 100 })),
  }
}

function createFakeGenderData(): DonutChartSeries[] {
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

  locationData.push({ key: 'IR', value: { value: 1000, color: '#00A693' } }) //Persian Green

  return locationData
}

export default handlers
