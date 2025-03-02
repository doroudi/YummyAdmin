import { faker } from '@faker-js/faker/locale/en'
import { HttpResponse, http } from 'msw'
import times from 'lodash/times'
import type { DashboardSummaryStatDto, SummaryStatDto } from '~/models/SummaryStat'

const handlers = [
  http.get('/api/report/summary', ({ request }) => {
    const response = createFakeSummaryData()
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

export default handlers
