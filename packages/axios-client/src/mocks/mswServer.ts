import { setupServer } from 'msw/node'
import { handlers, defaultHandlers } from './handlers'

export const server = setupServer(...handlers, ...defaultHandlers)
