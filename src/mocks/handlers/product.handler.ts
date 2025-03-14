import { faker } from '@faker-js/faker/locale/en'
import { HttpResponse, http } from 'msw'
import times from 'lodash/times'
import { CreatePagedResponse } from '../handlers.utility'
import { type ProductListDto, ProductStatus } from '~/models/Product'
import type { Category } from '~/models/Category'

const products = times(27, createFakeProductListItem)
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
    rate: faker.number.float({ min: 3, max: 5, multipleOf: 0.1 }),
    price: faker.commerce.price(),
    name: faker.commerce.productName(),
    status: faker.helpers.enumValue(ProductStatus),
    stock: faker.datatype.boolean(),
    category: createFakeCategory(),
    image: faker.image.urlPicsumPhotos({ height: 400, width: 400 }),
  }
}

function createFakeCategory(): Category {
  return {
    id: faker.number.int({ min: 100, max: 20000 }),
    name: faker.commerce.productAdjective(),
    productsCount: 0, // faker.number.int(),
  }
}
export default handlers
