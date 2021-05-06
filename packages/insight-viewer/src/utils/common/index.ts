import consola from 'consola'
import { HTTPError } from '../../types'

export function handleError(e: Error): void {
  consola.error(e)
}

export function defaultHttpErrorHandler(e: HTTPError): void {
  handleError(new Error(e?.error?.message || 'An error has occured!'))
}
