import { Dispatch, SetStateAction } from 'react'
import { OnError, Progress, SetHeader } from '../types'
// import { CornerstoneEventData } from '../utils/cornerstoneHelper/types'

export interface ContextProp {
  onError: OnError
  Progress: Progress
  setHeader: SetHeader
}

export interface ViewrportContexState {
  invert: boolean
}

export type ViewrportContextProp = ViewrportContexState & {
  setViewportContext: Dispatch<SetStateAction<ViewrportContexState>>
}
