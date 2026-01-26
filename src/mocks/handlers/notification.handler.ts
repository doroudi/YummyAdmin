import { faker } from '@faker-js/faker/locale/en'
import { HttpResponse, http } from 'msw'
import { type Notification, NotificationType } from '~/models/Notification'
import { CreateListResponse } from '../handlers.utility'

const notifications = createFakeNotification()

const handlers = [
  http.get('/api/notification', ({ request }) => {
    const response = CreateListResponse<Notification>(
      request,
      notifications,
      'title',
    )
    return HttpResponse.json(response, { status: 200 })
  }),
]

function createFakeNotification(): Notification[] {
  return [
    {
      id: faker.string.uuid(),
      title: 'order',
      key: 'orderSubmitted',
      data: { id: 110 },
      type: NotificationType.order,
    },
    {
      id: faker.string.uuid(),
      title: 'security',
      key: 'passwordExpire',
      data: { count: 7 },
      type: NotificationType.security,
    },
    {
      id: faker.string.uuid(),
      title: 'stats',
      key: 'customerRegister',
      data: { count: 10 },
      type: NotificationType.customer,
    },
    {
      id: faker.string.uuid(),
      title: 'productStock',
      key: 'stockWarning',
      data: { id: 10 },
      type: NotificationType.info,
    },
    {
      id: faker.string.uuid(),
      title: 'order',
      key: 'orderCanceled',
      data: { id: 100 },
      type: NotificationType.order,
    },
    {
      id: faker.string.uuid(),
      title: 'stats',
      key: 'customerRegister',
      data: { count: 10 },
      type: NotificationType.customer,
    },

    {
      id: faker.string.uuid(),
      title: 'order',
      key: 'orderSubmitted',
      type: NotificationType.order,
      data: { orderId: 99 },
    },
  ]
}

export default handlers
