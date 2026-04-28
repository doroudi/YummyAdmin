import { faker } from '@faker-js/faker/locale/en'
import times from 'lodash/times'
import { delay, HttpResponse, http } from 'msw'
import type { OrderList } from '~/models/Order'
import { OrderStatus } from '~/models/Order'
import { CreatePagedResponse } from '../handlers.utility'

const orders = times(100, createFakeOrder)

const handlers = [
  http.get('/api/order', async ({ request }) => {
    const response = CreatePagedResponse<OrderList>(request, orders, 'customer')
    await delay(1500)
    return HttpResponse.json(response, { status: 200 })
  }),

  http.put('/api/order/:id/status', async ({ params, request }) => {
    const { id } = params
    const body = (await request.json()) as { status: OrderStatus }

    await delay(300)

    const orderIndex = orders.findIndex((o) => o.id === id)
    if (orderIndex === -1) {
      return new HttpResponse(null, { status: 404 })
    }

    const order = orders[orderIndex]

    if (order.status === OrderStatus.Delivered) {
      return HttpResponse.json(false, { status: 400 })
    }

    orders[orderIndex] = {
      ...order,
      status: body.status,
    }

    return HttpResponse.json(true, { status: 200 })
  }),
]

function createFakeOrder(): OrderList {
  return {
    id: faker.number.int().toString(),
    status: faker.helpers.enumValue(OrderStatus),
    address: {
      city: {
        name: faker.location.city(),
        provinceId: faker.number.int().toString(),
        id: faker.number.int().toString(),
      },
      province: {
        name: faker.location.city(),
        id: faker.number.int().toString(),
      },
      id: faker.number.int().toString(),
      text: faker.location.streetAddress(),
    },
    itemsCount: faker.number.int({ min: 1, max: 25 }),
    createdDate: faker.date.recent(),
    customer: {
      id: faker.number.int().toString(),
      avatar: `https://avatar.iran.liara.run/public/${faker.number.int({
        min: 1,
        max: 100,
      })}`,
      name: faker.person.fullName(),
    },
    totalPrice: faker.number.int({ min: 10, max: 2000 }),
  }
}

export default handlers
