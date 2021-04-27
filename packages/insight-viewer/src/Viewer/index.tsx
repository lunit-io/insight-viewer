import React, { useRef } from 'react'
import ViewerWrapper from '../components/ViewerWrapper'
import { WithChildren } from '../types'
import { useLoadImage } from '../modules/cornerstoneHelper'

export type Prop = WithChildren<{
  imageId?: string
}>

export function DICOMImageViewer({ imageId = undefined }: Prop): JSX.Element {
  const elRef = useRef<HTMLDivElement>(null)

  useLoadImage({
    imageId,
    type: 'wado',
    ref: elRef,
  })

  return <ViewerWrapper ref={elRef} />
}

export function WebImageViewer({ imageId = undefined }: Prop): JSX.Element {
  const elRef = useRef<HTMLDivElement>(null)

  useLoadImage({
    imageId,
    type: 'web',
    ref: elRef,
  })

  return <ViewerWrapper ref={elRef} />
}
