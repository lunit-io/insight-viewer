import React, { useRef } from 'react'
import Wrapper from '../components/Wrapper'
import { WithChildren, ViewerType } from '../types'
import { useLoadImage } from '../modules/cornerstoneHelper'

export type Prop = WithChildren<{
  imageId?: string
  type?: ViewerType
}>

export default function Viewer({
  imageId = undefined,
  type = 'wado',
}: Prop): JSX.Element {
  const elRef = useRef<HTMLDivElement>(null)

  useLoadImage({
    imageId,
    type,
    ref: elRef,
  })

  return <Wrapper ref={elRef} />
}
