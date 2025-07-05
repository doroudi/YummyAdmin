import { faker } from '@faker-js/faker/locale/en'
import times from 'lodash/times'
import { http, HttpResponse, delay } from 'msw'
import type { Brand, BrandCreateModel } from '~/models/Brand'
import { CreatePagedResponse } from '../handlers.utility'

const brands = times(17, createFakeBrand)
const handlers = [
  http.get('/api/Brand', async ({ request }) => {
    const response = CreatePagedResponse<Brand>(request, brands)
    await delay(1500)
    return HttpResponse.json(response, { status: 200 })
  }),
  http.post('/api/brand', async ({ request }) => {
    const newItem = (await request.json()) as BrandCreateModel
    const brand: Brand = {
      id: faker.number.int({ max: 2000 }).toString(),
      name: newItem.name,
      url: newItem.url,
      image: newItem.image!,
    }
    brands.push(brand)
    return HttpResponse.json(brand, { status: 201 })
  }),
  http.delete('/api/Brand/:id', ({ params }) => {
    const { id } = params
    const itemIndex = brands.findIndex((x) => x.id === id)
    brands.splice(itemIndex, 1)
    return HttpResponse.json(true, { status: 200 })
  }),
]

function createFakeBrand(): Brand {
  const name = faker.company.name()
  return {
    id: faker.number.int().toString(),
    name,
    image: '',
    url: toKebabCase(name),
  }
}

function toKebabCase(str: string) {
  return str
    .replaceAll(' ', '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
}

export default handlers
