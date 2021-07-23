import { formatError } from './index'

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
})
