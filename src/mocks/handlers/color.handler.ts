import { HttpResponse, http } from 'msw'
import times from 'lodash/times'
import { faker } from '@faker-js/faker/locale/en'
import { CreatePagedResponse } from '../handlers.utility'
import type { Color, ColorCreateModel } from '~/models/Color'

const colors = times(7, createFakeColor)
const handlers = [
  http.get('/api/Color', ({ request }) => {
    const response = CreatePagedResponse<Color>(request, colors)
    return HttpResponse.json(response, { status: 200 })
  }),
  http.post('/api/color', async ({ request }) => {
    const newItem = await request.json() as ColorCreateModel
    const color: Color = {
      id: faker.number.int({ max: 2000 }).toString(),
      name: newItem.name,
      color: newItem.color,
    }
    colors.push(color)
    return HttpResponse.json(color, { status: 201 })
  }),
  http.delete('/api/Color/:id', ({ params }) => {
    const { id } = params
    const itemIndex = colors.findIndex(x => x.id === id)
    colors.splice(itemIndex, 1)
    return HttpResponse.json(true, { status: 200 })
  }),

]

function createFakeColor(): Color {
  const color = faker.color.human()
  return {
    id: faker.number.int().toString(),
    name: color,
    color,
  }
}

export default handlers
