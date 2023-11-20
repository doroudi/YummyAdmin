import { rest } from 'msw'
import _ from 'lodash'
import { faker } from '@faker-js/faker'
import { CreatePagedResponse } from '../handlers.utility'
import type { Color, ColorCreateModel } from '~/models/Color'

const colors = _.times(7, createFakeColor)
const handlers = [
  rest.get('/api/Color', (req, res, ctx) => {
    const response = CreatePagedResponse<Color>(req, colors)
    return res(
      ctx.status(200),
      ctx.delay(200),
      ctx.json(response),
    )
  }),
  rest.post('/api/color', async (req, res, ctx) => {
    const newItem = await req.json<ColorCreateModel>()
    const color: Color = {
      id: faker.datatype.number({ max: 2000 }).toString(),
      name: newItem.name,
      color: newItem.color,
    }
    colors.push(color)
    return res(
      ctx.status(200),
      ctx.delay(200),
      ctx.json(color),
    )
  }),
  rest.delete('/api/Color/:id', (req, res, ctx) => {
    const id = req.params.id.toString()
    const itemIndex = colors.findIndex(x => x.id === id)
    colors.splice(itemIndex, 1)
    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json(true),
    )
  }),

]

function createFakeColor(): Color {
  return {
    id: faker.datatype.number().toString(),
    name: faker.color.human(),
    color: faker.color.rgb(),
  }
}

export default handlers
