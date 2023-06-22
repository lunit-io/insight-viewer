import { rest } from 'msw'
import { IMAGES } from '@insight-viewer-library/fixtures'

const PREFIX = 'wadouri:'

export const handlers = [
  rest.get('/msw/with-jwt', async (req, res, ctx) => {
    const authHeader = req.headers.get('Authorization')
    const imageBuffer = await fetch(IMAGES[9].replace(PREFIX, '')).then((r) => r.arrayBuffer())
    if (!authHeader) {
      return res(ctx.status(403), ctx.json({ message: 'Failed to authenticate!' }))
    }
    return res(ctx.set('Content-Length', imageBuffer.byteLength.toString()), ctx.body(imageBuffer))
  }),

  rest.get('/msw/no-content-length/1', async (_, res, ctx) => {
    const imageBuffer = await fetch(IMAGES[1].replace(PREFIX, '')).then((r) => r.arrayBuffer())
    return res(ctx.body(imageBuffer))
  }),
  rest.get('/msw/no-content-length/2', async (_, res, ctx) => {
    const imageBuffer = await fetch(IMAGES[6].replace(PREFIX, '')).then((r) => r.arrayBuffer())
    return res(ctx.body(imageBuffer))
  }),
  rest.get('/msw/no-content-length/3', async (_, res, ctx) => {
    const imageBuffer = await fetch(IMAGES[7].replace(PREFIX, '')).then((r) => r.arrayBuffer())
    return res(ctx.body(imageBuffer))
  }),
  rest.get('/msw/no-content-length/4', async (_, res, ctx) => {
    const imageBuffer = await fetch(IMAGES[8].replace(PREFIX, '')).then((r) => r.arrayBuffer())
    return res(ctx.body(imageBuffer))
  }),
]
