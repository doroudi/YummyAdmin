import { HttpResponse, http } from 'msw'
import times from 'lodash/times'
import { faker } from '@faker-js/faker/locale/en'
import { CreatePagedResponse } from '../handlers.utility'
import { OrderStatus } from '~/models/Order'
import type { OrderList } from '~/models/Order'

const orders = times(100, createFakeOrder)
const handlers = [
  http.get('/api/order', ({ request }) => {
    const response = CreatePagedResponse<OrderList>(request, orders)
    return HttpResponse.json(response, { status: 200 })
  }),
]

function createFakeOrder(): OrderList {
  return {
    id: faker.number.int().toString(),
    status: faker.helpers.enumValue(OrderStatus),
    address: {
      city: { name: faker.location.city(), provinceId: faker.number.int().toString(), id: faker.number.int().toString() },
      province: { name: faker.location.city(), id: faker.number.int().toString() },
      id: faker.number.int().toString(),
      text: faker.location.streetAddress(),
    },
    itemsCount: faker.number.int({ min: 1, max: 25 }),
    createdDate: faker.date.past(),
    customer: `${faker.person.fullName()}`,
    customerId: faker.number.int().toString(),
    totalPrice: faker.number.int({ min: 10, max: 2000 }),
  }
}
export default handlers
