import { rest } from 'msw'
import { ERROR_MESSAGE } from './constant'

export const handlers = [
  rest.get('*/superhero', (_, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([
        { superheroName: 'Batman' },
        { superheroName: 'Superman' },
        { superheroName: 'Flash' },
      ])
    )
  ),
]

export const defaultHandlers = [
  rest.get('*', (_, res, ctx) => res(ctx.status(200), ctx.json({}))),
  rest.post('*', (_, res, ctx) => res(ctx.status(200), ctx.json({}))),
  rest.patch('*', (_, res, ctx) => res(ctx.status(200), ctx.json({}))),
  rest.put('*', (_, res, ctx) => res(ctx.status(200), ctx.json({}))),
  rest.delete('*', (_, res, ctx) => res(ctx.status(200), ctx.json({}))),
]

export const networkErrorHandlers = [
  rest.get('*', (_, res) => res.networkError('Boom there was error')),
  rest.post('*', (_, res) => res.networkError('Boom there was error')),
  rest.patch('*', (_, res) => res.networkError('Boom there was error')),
  rest.put('*', (_, res) => res.networkError('Boom there was error')),
  rest.delete('*', (_, res) => res.networkError('Boom there was error')),
]

const methods = ['get', 'post', 'patch', 'put', 'delete'] as const

function createErrorHandlers(
  statusCode: Exclude<keyof typeof ERROR_MESSAGE, 'Network'>
) {
  return methods.map(method =>
    // prettier-ignore
    rest[method]('*', (_, res, ctx) =>
    res(
      ctx.status(statusCode),
      ctx.json({
        errorMessage: ERROR_MESSAGE[statusCode],
      })
    )
  )
  )
}

export const error401Handlers = createErrorHandlers(401)
export const error403Handlers = createErrorHandlers(403)
export const error404Handlers = createErrorHandlers(404)
export const error500Handlers = createErrorHandlers(500)
export const error502Handlers = createErrorHandlers(502)
export const error503Handlers = createErrorHandlers(503)
