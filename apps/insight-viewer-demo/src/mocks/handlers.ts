import { rest } from 'msw'

export const handlers = [
  rest.get('/msw/with-jwt', async (req, res, ctx) => {
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
]
