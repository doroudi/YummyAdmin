import { faker } from '@faker-js/faker'
import { http, HttpResponse } from 'msw'
import type { Profile, ProfileSettings } from '~/models/Profile'

const handlers = [
  http.get('/api/profile/user-profile', () => {
    const response = createFakeProfile()
    return HttpResponse.json(response, { status: 200 })
  }),

  http.get('/api/profile/user-settings', () => {
    const response: ProfileSettings = {
      notifications: [
        { type: 'New Order', email: true, push: false, sms: false },
        { type: 'New Register', email: false, push: false, sms: false },
        { type: 'New Message', email: true, push: false, sms: false },
        { type: 'Out Of Stoke', email: true, push: true, sms: true },
      ],
    }

    return HttpResponse.json(response, { status: 200 })
  }),
]

function createFakeProfile(): Profile {
  return {
    id: 1,
    username: faker.internet.userName(),
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    role: 'Administrator',
    avatar: `https://avatar.iran.liara.run/public/${faker.number.int({
      min: 1,
      max: 100,
    })}`,
    phone: faker.phone.number(),
    socials: [
      { name: 'facebook', url: faker.internet.url() },
      { name: 'telegram', url: faker.internet.url() },
      { name: 'instagram', url: faker.internet.url() },
      { name: 'x', url: faker.internet.url() },
    ],
    bio: faker.lorem.paragraph(),
    location: faker.location.city(),
    address: {
      country: faker.location.country(),
      city: faker.location.city(),
      postalCode: faker.location.zipCode(),
    },
  }
}

export default handlers
