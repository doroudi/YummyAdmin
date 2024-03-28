import { HttpResponse, http } from 'msw'
import { faker } from '@faker-js/faker/locale/en'
import times from 'lodash/times'
import { CreatePagedResponse } from '../handlers.utility'
import type { Review } from '~/models/Review'

const reviews = times(65, createFakeReview)
const handlers = [
  http.get('/api/review/', ({ request }) => {
    const response = CreatePagedResponse<Review>(request, reviews)
    return HttpResponse.json(response, { status: 200 })
  }),
]

function createFakeReview(): Review {
  return {
    id: faker.number.int().toString(),
    date: faker.date.past(),
    rate: faker.number.float({ max: 5 }),
    product: {
      name: faker.commerce.productName(),
      id: faker.number.int().toString(),
    },
    comment: {
      id: faker.number.int().toString(),
      message: faker.commerce.productAdjective(),
    },
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
  }
}

export default handlers
