import { faker } from '@faker-js/faker'
import _ from 'lodash'
import { ws } from 'msw'
import type { RequestHandler, WebSocketHandler, WebSocketLink } from 'msw'
import type { ChatItem } from '~/models/Chat'

const chatMessages: Array<ChatItem> = _.times(10, createFakeChatMessage)
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
      client.send(JSON.stringify({ type: 'UPDATE', payload: chatMessages }))
    }, 6000)

    client.addEventListener('close', () => {
      clearInterval(updateInterval)
    })

    client.addEventListener('message', ({ data }) => {
      const content = JSON.parse(data.toString())
      switch (content.action) {
        case 'DETAILS':
          sendInitialMessages(content.id, client)
          break
        case 'MESSAGE':
          sendMessages(content, client)
      }
    })
  }),
]

function sendInitialMessages(id: string, client: any) {
  const message = {
    id: faker.string.uuid(),
    senderId: faker.string.uuid(),
    content: 'Welcome to the chat! How can I assist you today?',
    created: new Date(),
    updated: new Date(),
  }

  client.send(JSON.stringify({ type: 'MESSAGE', payload: message }))
  setTimeout(() => {
    const secondMessage = {
      id: faker.string.uuid(),
      senderId: faker.string.uuid(),
      content: `Please support this project by giving a star in <a target="_blank" href='https://github.com/doroudi/yummyadmin'>Github</a>`,
      created: new Date(),
      updated: new Date(),
    }
    client.send(JSON.stringify({ type: 'MESSAGE', payload: secondMessage }))
  }, 1500)
}
function sendMessages(content: any, client: any) {
  const message = {
    id: faker.string.uuid(),
    senderId: faker.string.uuid(),
    content: `You said: ${content.message.content}`,
    created: new Date(),
    updated: new Date(),
  }
  setTimeout(() => {
    client.send(JSON.stringify({ type: 'MESSAGE', payload: message }))
  }, 300)
}

function createFakeChatMessage(): ChatItem {
  const randomCount = faker.number.int({ min: -10, max: 10 })
  return {
    from: {
      avatar: `https://avatar.iran.liara.run/public/${faker.number.int({
        min: 1,
        max: 200,
      })}`,
      name: faker.person.fullName(),
      id: faker.string.uuid(),
    },
    title: faker.lorem.sentence(4),
    updated: randomCount > 0 ? new Date() : faker.date.recent(),
    id: faker.string.uuid(),
    badge: randomCount > 0 ? randomCount : undefined,
    isUnread: randomCount > 0,
  }
}

function updateMessages() {
  const randomIndex = faker.number.int({
    min: 0,
    max: chatMessages.length - 1,
  })
  const randomMessage = chatMessages[randomIndex]
  randomMessage.updated = faker.date.recent()
  randomMessage.badge = faker.number.int({ min: 1, max: 10 })
  randomMessage.isUnread = true
}
export default handlers
