import { faker } from '@faker-js/faker'
import { HttpResponse, http } from 'msw'
import _ from 'lodash'
import { CreatePagedResponse } from '../handlers.utility'
import { type ProductListDto, ProductStatus } from '~/models/Product'
import type { Category } from '~/models/Category'

const products = _.times(30, createFakeProductListItem)
const handlers = [
  http.get('/api/product', ({ request }) => {
    const response = CreatePagedResponse<ProductListDto>(request, products)
    return HttpResponse.json(response, { status: 200 })
  }),
]

function createFakeProductListItem(): ProductListDto {
  return {
    id: faker.number.int().toString(),
    code: faker.number.int({ min: 9999, max: 99999 }).toString(),
    bestPrice: faker.commerce.price(),
    rate: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
    price: faker.commerce.price(),
    name: faker.commerce.productName(),
    status: faker.helpers.enumValue(ProductStatus),
    stock: faker.datatype.boolean(),
    category: createFakeCategory(),
    image: faker.image.dataUri(),
  }
}

function createFakeCategory(): Category {
  return {
    id: faker.number.int(),
    name: faker.commerce.productAdjective(),
    productsCount: 0,
  }
}
export default handlers
