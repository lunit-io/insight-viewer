import { ViewerError } from '../../types'

/**
 * ky HTTPError
 * https://github.com/sindresorhus/ky/blob/main/source/errors/HTTPError.ts
 * { error: { name: 'HTTPError', options, request, response, message, stack }
 */
interface HTTPError {
  error: { response: { status: number }; message: string }
}

export function formatError(e: Error | HTTPError): ViewerError {
  const err: ViewerError = new Error(
    e instanceof Error ? e.message : e.error.message
  )
  if (!(e instanceof Error)) err.status = e?.error?.response?.status
  return err
}
