import { viewportMessage } from './utils/messageService'

export const setViewport = viewportMessage.sendMessage
export { default } from './hooks/useInsightViewer'
export { useViewportContext as useViewport } from './Context/Viewport'
export { default as useFrame } from './hooks/useFrame'
export type { Viewport } from './Context/Viewport/types'
export type { ViewerError } from './types'
