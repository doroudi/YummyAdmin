import { faker } from '@faker-js/faker/locale/en'
import times from 'lodash/times'
import { http, HttpResponse, delay } from 'msw'
import type { Category, CategoryCreateModel } from '~/models/Category'
import { CreateListResponse, CreatePagedResponse } from '../handlers.utility'

const categories = times(20, createFakeCategory)
const handlers = [
  http.get('/api/category', async ({ request }) => {
    const response = CreatePagedResponse<Category>(request, categories)
    await delay(800)
    return HttpResponse.json(response, { status: 200 })
  }),
  http.get('/api/category/all', async ({ request }) => {
    const response = CreateListResponse<Category>(request, categories)
    await delay(500)
    return HttpResponse.json(response, { status: 200 })
  }),
  http.get('/api/category/stats', () => {
    const response = {
      summaryStats: {
        count: categories.length,
      },
      productsByCategoryStat: categories
        .sort((a, b) => b.productsCount - a.productsCount)
        .slice(0, 5)
        .map((cat) => ({
          name: cat.name,
          value: cat.productsCount,
        })),
    }
    return HttpResponse.json(response, { status: 200 })
  }),

  http.post('/api/category', async ({ request }) => {
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

  http.delete('/api/category/:id', ({ params }) => {
    const { id } = params ?? '1'
    const itemIndex = categories.findIndex(
      (x) => x.id === Number.parseInt(id?.toString() ?? '1'),
    )
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
