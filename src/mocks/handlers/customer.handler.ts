import { faker } from '@faker-js/faker/locale/en'
import times from 'lodash/times'
import { http, HttpResponse } from 'msw'
import { CreatePagedResponse } from '../handlers.utility'

import type { Customer, CustomerCreateModel } from '~/models/Customer'

const customers = times(65, createFakeCustomer)
const handlers = [
  http.get('/api/customer', ({ request }) => {
    const response = CreatePagedResponse<Customer>(
      request,
      customers,
      'firstName',
    )
    return HttpResponse.json(response, { status: 200 })
  }),
  http.post('/api/customer', async ({ request }) => {
    const newItem = (await request.json()) as CustomerCreateModel
    const customer: CustomerCreateModel = {
      id: faker.number.int({ max: 2000 }).toString(),
      firstName: newItem.firstName,
      lastName: newItem.lastName,
      address: [],
      mobile: newItem.mobile,
      joinDate: new Date(),
      birthDate: newItem.birthDate,
      email: newItem.email,
    }
    customers.push(customer)
    return HttpResponse.json(customer, { status: 201 })
  }),
  http.delete('/api/customer/:id', ({ params }) => {
    const { id } = params
    const itemIndex = customers.findIndex((x) => x.id === id)
    customers.splice(itemIndex, 1)
    return HttpResponse.json(true, { status: 200 })
  }),
]

function createFakeCustomer(): Customer {
  return {
    id: faker.number.int().toString(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: [],
    mobile: faker.phone.number(),
    joinDate: faker.date.past(),
    birthDate: faker.date.birthdate(),
    email: faker.internet.email(),
    avatar: `https://avatar.iran.liara.run/public/${faker.number.int({
      min: 1,
      max: 100,
    })}`,
    emailConfirmed: faker.datatype.boolean({ probability: 0.8 }),
    phoneConfirmed: faker.datatype.boolean({ probability: 0.8 }),
    points: faker.number.int({ min: 0, max: 250 }),
    ordersCount: faker.number.int({ max: 50 }),
    userGroup: 'General',
    walletBalance: faker.number.int({ max: 150000 }),
  }
}

export default handlers
