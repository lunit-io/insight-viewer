import { viewportMessage } from './utils/messageService'

export { default } from './Viewer'
export { default as useMultiframe } from './hooks/useMultiframe'
export const setViewport = viewportMessage.sendMessage
export type { Viewport } from './Context/Viewport/types'
export type { ViewerError } from './types'
export { useViewportContext as useViewport } from './Context/Viewport'
