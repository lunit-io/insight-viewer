import { setupWorker, rest } from 'msw'

export const handlers = [
  rest.get('/api/no-content-length', async (_, res, ctx) => {
    const imageBuffer = await fetch(
      'https://static.lunit.io/fixtures/dcm-files/series/CT000011.dcm'
    ).then(r => r.arrayBuffer())
    return res(ctx.body(imageBuffer))
  }),
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
]

export const worker = setupWorker(...handlers)
