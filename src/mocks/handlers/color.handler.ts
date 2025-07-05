import { faker } from '@faker-js/faker/locale/en'
import times from 'lodash/times'
import { http, HttpResponse, delay } from 'msw'
import type { Color, ColorCreateModel } from '~/models/Color'
import { CreatePagedResponse } from '../handlers.utility'

const colors = times(15, createFakeColor)
const handlers = [
  http.get('/api/Color', async ({ request }) => {
    const response = CreatePagedResponse<Color>(request, colors)
    await delay(1000)
    return HttpResponse.json(response, { status: 200 })
  }),
  http.post('/api/color', async ({ request }) => {
    const newItem = (await request.json()) as ColorCreateModel
    const color: Color = {
      id: faker.number.int({ max: 2000 }).toString(),
      name: newItem.name,
      color: newItem.color,
    }
    colors.unshift(color)
    return HttpResponse.json(color, { status: 201 })
  }),
  http.delete('/api/Color/:id', ({ params }) => {
    const { id } = params
    const itemIndex = colors.findIndex((x) => x.id === id)
    colors.splice(itemIndex, 1)
    return HttpResponse.json(true, { status: 200 })
  }),
]

function createFakeColor(): Color {
  const colors = [
    'Red',
    'Green',
    'Blue',
    'Orange',
    'Lime',
    'Cyan',
    'Purple',
    'Gold',
    'Grey',
    'Black',
    'White',
    'Pink',
    'AliceBlue',
    'Lavender',
    'Yellow',
    'Bisque',
    'Azure',
    'Coral',
    'Brown',
    'Crimson',
    'DarkGoldenRod',
    'DarkGreen',
    'DarkGrey',
    'DarkKhaki',
    'DarkSlateBlue',
    'DarkSeaGreen',
    'DodgerBlue',
    'ForestGreen',
    'FireBrick',
    'FloralWhite',
    'Gainsboro',
    'GreenYellow',
    'HotPink',
    'LightCoral',
    'Fuchsia',
    'indigo',
    'tan',
    'turquoise',
    'teal',
    'silver',
  ]
  const color = faker.helpers.arrayElement(colors)
  return {
    id: faker.number.int().toString(),
    name: color,
    color,
  }
}

export default handlers
