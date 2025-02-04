import { HttpResponse, http } from 'msw'
import { faker } from '@faker-js/faker/locale/en'
import { CreateListResponse } from '../handlers.utility'

import { type Notification, NotificationType } from '~/models/Notification'

const notifications = createFakeNotification()

const handlers = [
  http.get('/api/notification', ({ request }) => {
    const response = CreateListResponse<Notification>(request, notifications, 'title')
    return HttpResponse.json(response, { status: 200 })
  }),
]

function createFakeNotification(): Notification[] {
  return [
    {
      id: faker.string.uuid(),
      title: 'Order',
      message: 'New Order Submitted',
      type: NotificationType.Order,
      isForce: false,
    },
    {
      id: faker.string.uuid(),
      title: 'Security',
      message: 'Your password will expires in a week',
      type: NotificationType.Alert,
      isForce: true,
    },
    {
      id: faker.string.uuid(),
      title: 'Stats',
      message: '10 New Customers registered yesterday',
      type: NotificationType.Message,
      isForce: false,
    },
    {
      id: faker.string.uuid(),
      title: 'Product Stock',
      message: 'Product stock is getting low',
      type: NotificationType.Info,
      isForce: false,
    },
    {
      id: faker.string.uuid(),
      title: 'Order',
      message: 'New order was submitted',
      type: NotificationType.Order,
      isForce: false,
    },
  ]
}

export default handlers
