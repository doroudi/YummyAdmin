import { rest } from 'msw'
import _ from 'lodash'
import { faker } from '@faker-js/faker'
import { CreatePagedResponse } from '../handlers.utility'
import type { Category, CategoryCreateModel } from '~/models/Category'

const categories = _.times(7, createFakeCategory)
const handlers = [
  rest.get('/api/Category', (req, res, ctx) => {
    const response = CreatePagedResponse<Category>(req, categories)
    return res(
      ctx.status(200),
      ctx.delay(200),
      ctx.json(response),
    )
  }),
  rest.post('/api/Category', async (req, res, ctx) => {
    const newItem = await req.json<CategoryCreateModel>()
    const category: Category = {
      id: faker.datatype.number({ max: 2000 }),
      name: newItem.name,
      productsCount: 0,
      children: [],
    }
    categories.push(category)
    return res(
      ctx.status(200),
      ctx.delay(200),
      ctx.json(category),
    )
  }),
  rest.delete('/api/Category/:id', (req, res, ctx) => {
    const id = req.params.id.toString()
    const itemIndex = categories.findIndex(x => x.id === Number.parseInt(id))
    categories.splice(itemIndex, 1)
    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json(true),
    )
  }),

]

function createFakeCategory(): Category {
  return {
    id: faker.datatype.number(),
    name: faker.commerce.productAdjective(),
    productsCount: faker.datatype.number({ min: 1, max: 130 }),
    children: [
      {
        id: faker.datatype.number(),
        name: faker.commerce.productAdjective(),
        productsCount: faker.datatype.number({ min: 1, max: 130 }),
      },
      {
        id: faker.datatype.number(),
        name: faker.commerce.productAdjective(),
        productsCount: faker.datatype.number({ min: 1, max: 130 }),
        children: [
          {
            id: faker.datatype.number(),
            name: faker.commerce.productAdjective(),
            productsCount: faker.datatype.number({ min: 1, max: 130 }),
          },
        ],
      },
    ],
  }
}

export default handlers
