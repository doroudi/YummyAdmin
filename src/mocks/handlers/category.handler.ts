import { rest } from 'msw'
import _ from 'lodash'
import { faker } from '@faker-js/faker'
import { CreatePagedResponse } from '../handlers.utility'
import type { Category } from '~/models/Category'

const categories = _.times(77, createFakeCategory)
const handlers = [
  rest.get('/api/Category', (req, res, ctx) => {
    const response = CreatePagedResponse<Category>(req, categories)
    return res(
      ctx.status(200),
      ctx.delay(200),
      ctx.json(response),
    )
  }),
]

function createFakeCategory(): Category {
  return {
    id: faker.datatype.number(),
    name: faker.commerce.productAdjective(),
    productsCount: faker.datatype.number({ min: 1, max: 130 }),
  }
}

export default handlers
