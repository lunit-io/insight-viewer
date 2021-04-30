import { rest } from 'msw'

export const handlers = [
  rest.get('/api/success', (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        username: req.url.searchParams.get('username'),
      })
    )
  ),
  rest.get('/api/networkError', (_, res) =>
    res.networkError('Failed to connect')
  ),
  rest.post<{ username: 'string' }>('/api/error/401', (req, res, ctx) => {
    const { username } = req.body

    return res(
      ctx.status(401),
      ctx.json({
        message: `User ${username} not found`,
      })
    )
  }),
  rest.post<{ username: 'string' }>('/api/error/403', (req, res, ctx) => {
    const { username } = req.body

    return res(
      ctx.status(403),
      ctx.json({
        message: `User '${username}' not found`,
      })
    )
  }),
  rest.post<{ username: 'string' }>('/api/error/500', (_, res, ctx) =>
    res(
      ctx.status(500),
      ctx.json({
        message: 'Internal Server Error',
      })
    )
  ),
  rest.post<{ username: 'string' }>('/api/error/503', (_, res, ctx) =>
    res(
      ctx.status(503),
      ctx.json({
        message: 'Service Unavailable',
      })
    )
  ),
]
