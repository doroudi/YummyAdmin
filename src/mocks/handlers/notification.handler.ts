import { faker } from '@faker-js/faker/locale/en'
import { http, HttpResponse } from 'msw'
import { CreateListResponse } from '../handlers.utility'

import { type Notification, NotificationType } from '~/models/Notification'

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
      title: 'Order',
      message: 'New Order Submitted',
      type: NotificationType.order,
      isForce: false,
    },
    {
      id: faker.string.uuid(),
      title: 'Security',
      message: 'Your password will expires in a week',
      type: NotificationType.security,
      isForce: true,
    },
    {
      id: faker.string.uuid(),
      title: 'Stats',
      message: '10 New Customers registered yesterday',
      type: NotificationType.customer,
      isForce: false,
    },
    {
      id: faker.string.uuid(),
      title: 'Product Stock',
      message: 'Product stock is getting low',
      type: NotificationType.info,
      isForce: false,
    },
    {
      id: faker.string.uuid(),
      title: 'Order',
      message: 'New order was submitted',
      type: NotificationType.order,
      isForce: false,
    },
    {
      id: faker.string.uuid(),
      title: 'Stats',
      message: '10 New Customers registered yesterday',
      type: NotificationType.customer,
      isForce: false,
    },
    {
      id: faker.string.uuid(),
      title: 'Product Stock',
      message: 'Product stock is getting low',
      type: NotificationType.info,
      isForce: false,
    },
    {
      id: faker.string.uuid(),
      title: 'Order',
      message: 'New order was submitted',
      type: NotificationType.order,
      isForce: false,
    },
  ]
}

export default handlers
