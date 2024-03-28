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
      city: { name: 'Tehran', provinceId: faker.number.int().toString(), id: faker.number.int().toString() },
      province: { name: 'Tehran', id: faker.number.int().toString() },
      id: faker.number.int().toString(),
      text: '30, Shams Ave, Ghasrodasht St',
    },
    itemsCount: faker.number.int({ max: 10 }),
    createdDate: faker.date.past(),
    customer: `${faker.person.firstName()} ${faker.person.lastName()}`,
    customerId: faker.number.int().toString(),
    totalPrice: faker.number.int({ min: 20000, max: 10000000 }),
  }
}
export default handlers
