import { HttpResponse, http } from 'msw'
import times from 'lodash/times'
import { faker } from '@faker-js/faker/locale/en'
import { CreatePagedResponse } from '../handlers.utility'
import type { Category, CategoryCreateModel } from '~/models/Category'

const categories = times(20, createFakeCategory)
const handlers = [
  http.get('/api/Category', ({ request }) => {
    const response = CreatePagedResponse<Category>(request, categories)
    return HttpResponse.json(response, { status: 200 })
  }),

  http.post('/api/Category', async ({ request }) => {
    const newItem = (await request.json()) as CategoryCreateModel
    const category: Category = {
      id: faker.number.int({ max: 2000 }),
      name: newItem.name,
      productsCount: 0,
      children: [],
    }
    categories.unshift(category)
    return HttpResponse.json(category, { status: 201 })
  }),

  http.delete('/api/Category/:id', ({ params }) => {
    const { id } = params ?? '1'
    const itemIndex = categories.findIndex(x => x.id === Number.parseInt(id?.toString() ?? '1'))
    categories.splice(itemIndex, 1)
    return HttpResponse.json(true, { status: 200 })
  }),
]

function createFakeCategory(): Category {
  return {
    id: faker.number.int(),
    name: faker.commerce.productAdjective(),
    productsCount: faker.number.int({ min: 1, max: 130 }),
    children: [
      {
        id: faker.number.int(),
        name: faker.commerce.productAdjective(),
        productsCount: faker.number.int({ min: 1, max: 130 }),
      },
      {
        id: faker.number.int(),
        name: faker.commerce.productAdjective(),
        productsCount: faker.number.int({ min: 1, max: 130 }),
        children: [
          {
            id: faker.number.int(),
            name: faker.commerce.productAdjective(),
            productsCount: faker.number.int({ min: 1, max: 130 }),
          },
        ],
      },
    ],
  }
}

export default handlers
