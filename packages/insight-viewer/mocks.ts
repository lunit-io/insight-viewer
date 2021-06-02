import { setupWorker, rest } from 'msw'

export const handlers = [
  rest.get('/api/no-content-length', async (_, res, ctx) => {
    const imageBuffer = await fetch(
      'https://static.lunit.io/fixtures/dcm-files/series/CT000011.dcm'
    ).then(r => r.arrayBuffer())
    return res(ctx.body(imageBuffer))
  }),
]

export const worker = setupWorker(...handlers)
