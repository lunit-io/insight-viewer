import config from '../../../config'

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined
}

export const LINKS = [
  { href: 'basic', name: 'Basic' },
  { href: 'error', name: 'Error' },
  { href: 'progress', name: 'Progress' },
  !config.IS_DEV ? undefined : { href: 'http-header', name: 'Http header' },
].filter(notEmpty)
