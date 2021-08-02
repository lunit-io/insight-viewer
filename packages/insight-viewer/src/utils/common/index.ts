import { Viewport, BasicViewport, ViewerError } from '../../types'

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

export function isValidViewport(viewport: Viewport): viewport is BasicViewport {
  return (
    viewport.scale !== undefined &&
    viewport.invert !== undefined &&
    viewport.hflip !== undefined &&
    viewport.vflip !== undefined &&
    viewport.x !== undefined &&
    viewport.y !== undefined &&
    viewport.windowWidth !== undefined &&
    viewport.windowCenter !== undefined
  )
}
