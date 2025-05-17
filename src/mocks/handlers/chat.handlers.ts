import { faker } from '@faker-js/faker'
import _ from 'lodash'
import { ws } from 'msw'
import type { RequestHandler, WebSocketHandler, WebSocketLink } from 'msw'
import type { MessageItem } from '~/models/Chat'

const chatMessages: Array<MessageItem> = _.times(12, createFakeChatMessage)
export const chat: WebSocketLink = ws.link('wss://localhost:7000/chat')
const handlers: Array<RequestHandler | WebSocketHandler> = [
  chat.addEventListener('connection', ({ client }) => {
    client.send(
      JSON.stringify({
        type: 'INIT',
        payload: chatMessages,
      }),
    )

    const updateInterval = setInterval(() => {
      updateMessages()
      client.send(
        JSON.stringify({ type: 'UPDATE', payload: chatMessages }),
      )
    }, 10000)

    client.addEventListener('close', () => {
      clearInterval(updateInterval)
    })
  }),
]

function createFakeChatMessage(): MessageItem {
  return {
    from: {
      avatar: `https://avatar.iran.liara.run/public/${faker.number.int({ min: 1, max: 200 })}`,
      name: faker.person.fullName(),
    },
    title: faker.lorem.sentence(4),
    updated: faker.date.recent(),
    id: faker.string.uuid(),
    badge: faker.number.int({ min: 0, max: 10 }),
  }
}

function updateMessages() {
  chatMessages.forEach((message) => {
    message.updated = faker.date.recent()
    message.badge = faker.number.int({ min: 0, max: 10 })
  })
}
export default handlers
