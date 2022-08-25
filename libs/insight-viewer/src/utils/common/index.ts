import { ViewerError } from '../../types'
import { ERROR_UNKNOWN } from './const'

/**
 * ky HTTPError
 * https://github.com/sindresorhus/ky/blob/main/source/errors/HTTPError.ts
 * { error: { name: 'HTTPError', options, request, response, message, stack }
 */
interface HTTPError {
  error: { response: { status: number }; message: string }
}

function isError(e: unknown): e is Error {
  return e instanceof Error
}

function isHTTPError(e: unknown): e is HTTPError {
  return (e as HTTPError)?.error !== undefined && (e as HTTPError)?.error?.message !== undefined
}

export function normalizeError(e: Error | HTTPError | unknown): ViewerError {
  if (isError(e)) return e
  if (isHTTPError(e)) {
    const err: ViewerError = new Error(e.error.message)
    err.status = e?.error?.response?.status
    return err
  }
  return new Error(ERROR_UNKNOWN)
}

export const noop: () => void = () => {}
