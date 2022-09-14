import { normalizeError } from './index'
import { ERROR_UNKNOWN } from './const'

describe('normalizeError', () => {
  it('formats Error instance', async () => {
    const result = normalizeError(new Error('something happened'))

    expect(result).toBeInstanceOf(Error)
    expect(result.message).toBe('something happened')
    expect(result.status).toBeUndefined()
  })

  it('formats HTTPError instance from ky.js', async () => {
    const result = normalizeError({
      error: { response: { status: 401 }, message: 'something happened' },
    })

    expect(result).toBeInstanceOf(Error)
    expect(result.message).toBe('something happened')
    expect(result.status).toBe(401)
  })

  it('formats unknown', async () => {
    const unknown: unknown = undefined
    const result = normalizeError(unknown)
    expect(result).toBeInstanceOf(Error)
    expect(result.message).toBe(ERROR_UNKNOWN)
    expect(result.status).toBeUndefined()
  })
})
