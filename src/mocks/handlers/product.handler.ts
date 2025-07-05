import { faker } from '@faker-js/faker/locale/en'
import times from 'lodash/times'
import { http, HttpResponse, delay } from 'msw'
import type { Category } from '~/models/Category'
import { type ProductListDto, ProductStatus } from '~/models/Product'
import { CreatePagedResponse } from '../handlers.utility'

let counter = 0
const fakeImages = [
  'ZANVnHE',
  'QkIa5tT',
  'Qphac99',
  'wXuQ7bm',
  'R3iobJA',
  '9LFjwpI',
  'ZKGofuB',
  'QkIa5tT',
  'cSytoSD',
  'qNOjJje',
  'cBuLvBi',
  'N1GkCIR',
  'kKc9A5p',
  'ZKGofuB',
  'GJi73H0',
  '633Fqrz',
  'mp3rUty',
  'JQRGIc2',
  '9LFjwpI',
  'vzrTgUR',
  'p5NdI6n',
  'R3iobJA',
  'Wv2KTsf',
  '76HAxcA',
  'wXuQ7bm',
  'BZrIEmb',
  'KcT6BE0',
  'cBuLvBi',
  'N1GkCIR',
  'kKc9A5p',
]
const products = times(27, createFakeProductListItem)

const handlers = [
  http.get('/api/product', async ({ request }) => {
    const response = CreatePagedResponse<ProductListDto>(request, products)
    await delay(1000)
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
    image: `https://i.imgur.com/${fakeImages[counter++]}.jpeg`, //faker.image.urlPicsumPhotos({ height: 400, width: 400 }),
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
