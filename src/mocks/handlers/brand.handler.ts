import { rest } from 'msw'
import _ from 'lodash'
import { faker } from '@faker-js/faker'
import { CreatePagedResponse } from '../handlers.utility'
import type { Brand, BrandCreateModel } from '~/models/Brand'

const brands = _.times(7, createFakeBrand)
const handlers = [
  rest.get('/api/Brand', (req, res, ctx) => {
    const response = CreatePagedResponse<Brand>(req, brands)
    return res(
      ctx.status(200),
      ctx.delay(200),
      ctx.json(response),
    )
  }),
  rest.post('/api/brand', async (req, res, ctx) => {
    const newItem = await req.json<BrandCreateModel>()
    const brand: Brand = {
      id: faker.datatype.number({ max: 2000 }).toString(),
      name: newItem.name,
      url: newItem.url,
      image: newItem.image,
    }
    brands.push(brand)
    return res(
      ctx.status(200),
      ctx.delay(200),
      ctx.json(brand),
    )
  }),
  rest.delete('/api/Brand/:id', (req, res, ctx) => {
    const id = req.params.id.toString()
    const itemIndex = brands.findIndex(x => x.id === id)
    brands.splice(itemIndex, 1)
    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json(true),
    )
  }),

]

function createFakeBrand(): Brand {
  const name = faker.company.name()
  return {
    id: faker.datatype.number().toString(),
    name,
    image: '',
    url: toKebabCase(name),
  }
}

function toKebabCase(str: string) {
  return str.replaceAll(' ', '').replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

export default handlers
