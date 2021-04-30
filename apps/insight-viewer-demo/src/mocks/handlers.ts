import { rest } from 'msw'

export const handlers = [
  rest.get('/api/with-cookie', async (req, res, ctx) => {
    const { authToken } = req.cookies
    const imageBuffer = await fetch('/CT000002.dcm').then(r => r.arrayBuffer())

    if (!authToken) {
      return res(
        ctx.status(403),
        ctx.json({ message: 'Failed to authenticate!' })
      )
    }
    return res(
      ctx.set('Content-Length', imageBuffer.byteLength.toString()),
      ctx.set('Content-Type', 'image/jpeg'),
      // Respond with the "ArrayBuffer".
      ctx.body(imageBuffer)
    )
  }),
  rest.get('/api/with-jwt', async (req, res, ctx) => {
    const authHeader = req.headers.get('Authorization')
    const imageBuffer = await fetch('/CT000009.dcm').then(r => r.arrayBuffer())

    if (!authHeader) {
      return res(
        ctx.status(403),
        ctx.json({ message: 'Failed to authenticate!' })
      )
    }
    return res(
      ctx.set('Content-Length', imageBuffer.byteLength.toString()),
      ctx.set('Content-Type', 'image/jpeg'),
      // Respond with the "ArrayBuffer".
      ctx.body(imageBuffer)
    )
  }),
]
