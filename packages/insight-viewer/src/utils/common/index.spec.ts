import { formatError } from './index'
import { ERROR_UNKNOWN } from './const'

describe('formatError', () => {
  it('formats Error instance', async () => {
    const result = formatError(new Error('something happended'))

    expect(result).toBeInstanceOf(Error)
    expect(result.message).toBe('something happended')
    expect(result.status).toBeUndefined()
  })

  it('formats HTTPError instance from ky.js', async () => {
    const result = formatError({
      error: { response: { status: 401 }, message: 'something happended' },
    })

    expect(result).toBeInstanceOf(Error)
    expect(result.message).toBe('something happended')
    expect(result.status).toBe(401)
  })

  it('formats unknown', async () => {
    const unknown: unknown = undefined
    const result = formatError(unknown)
    expect(result).toBeInstanceOf(Error)
    expect(result.message).toBe(ERROR_UNKNOWN)
    expect(result.status).toBeUndefined()
  })
})
