import { HttpResponse, http } from 'msw'
import _ from 'lodash'
import { faker } from '@faker-js/faker'
import { CreatePagedResponse } from '../handlers.utility'
import { OrderStatus } from '~/models/Order'
import type { Order, OrderItem } from '~/models/Order'

const orders = _.times(100, createFakeOrder)
const handlers = [
  http.get('/api/order/:id', ({ request }) => {
    const response = CreatePagedResponse<Order>(request, orders)
    return HttpResponse.json(response, { status: 200 })
  }),
]

function createFakeOrder(): Order {
  return {
    id: faker.number.int().toString(),
    status: faker.helpers.enumValue(OrderStatus),
    items: _.times(4, createFakeOrderItems),
    address: {
      city: { name: 'Tehran', provinceId: faker.number.int().toString(), id: faker.number.int().toString() },
      province: { name: 'Tehran', id: faker.number.int().toString() },
      id: faker.number.int().toString(),
      text: '30, Shams Ave, Ghasrodasht St',
    },
    createdDate: faker.date.past(),
    customer: {
      id: faker.number.int().toString(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      address: [],
      mobile: faker.phone.number(),
      joinDate: faker.date.past(),
      birthDate: faker.date.birthdate(),
      email: faker.internet.email(),
      ordersCount: faker.number.int({ max: 50 }),
    },
    totalPrice: faker.number.int({ min: 20000, max: 10000000 }),
  }
}

function createFakeOrderItems(): OrderItem {
  return {

  }
}
export default handlers
