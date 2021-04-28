import consola from 'consola'

export function handleError(e: Error): void {
  consola.error(e)
}
