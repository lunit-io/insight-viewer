import { rest } from 'msw'

export const handlers = [
  rest.get('/api/with-cookie', async (req, res, ctx) => {
    const { authToken } = req.cookies
    const imageBuffer = await fetch(
      'https://static.lunit.io/fixtures/dcm-files/series/CT000002.dcm'
    ).then(r => r.arrayBuffer())

    if (!authToken) {
      return res(
        ctx.status(403),
        ctx.json({ message: 'Failed to authenticate!' })
      )
    }
    return res(
      ctx.set('Content-Length', imageBuffer.byteLength.toString()),
      // Respond with the "ArrayBuffer".
      ctx.body(imageBuffer)
    )
  }),
  rest.get('/api/with-jwt', async (req, res, ctx) => {
    const authHeader = req.headers.get('Authorization')
    const imageBuffer = await fetch(
      'https://static.lunit.io/fixtures/dcm-files/series/CT000009.dcm'
    ).then(r => r.arrayBuffer())

    if (!authHeader) {
      return res(
        ctx.status(403),
        ctx.json({ message: 'Failed to authenticate!' })
      )
    }
    return res(
      ctx.set('Content-Length', imageBuffer.byteLength.toString()),
      ctx.body(imageBuffer)
    )
  }),
  rest.get('/api/no-content-length/1', async (_, res, ctx) => {
    const imageBuffer = await fetch(
      'https://static.lunit.io/fixtures/dcm-files/series/CT000011.dcm'
    ).then(r => r.arrayBuffer())
    return res(ctx.body(imageBuffer))
  }),
  rest.get('/api/no-content-length/2', async (_, res, ctx) => {
    const imageBuffer = await fetch(
      'https://static.lunit.io/fixtures/dcm-files/series/CT000012.dcm'
    ).then(r => r.arrayBuffer())

    return res(ctx.body(imageBuffer))
  }),
  rest.get('/api/no-content-length/3', async (_, res, ctx) => {
    const imageBuffer = await fetch(
      'https://static.lunit.io/fixtures/dcm-files/series/CT000013.dcm'
    ).then(r => r.arrayBuffer())

    return res(ctx.body(imageBuffer))
  }),
]
