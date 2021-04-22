import React, { useEffect, useRef } from 'react'
import Wrapper from '../components/Wrapper'
import { WithChildren, WidthHeight } from '../types'
import { init, loadImage } from '../modules/cornerstoneHelper'

type Prop = WithChildren<{
  imageId?: string
  size?: WidthHeight
}>

export default function Viewer({
  imageId,
  size: { width, height } = { width: '100%', height: '100%' },
}: Prop): JSX.Element {
  const elRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!imageId) return undefined
    if (!elRef || !elRef.current) return undefined

    init(elRef.current)
    loadImage(elRef.current, imageId)
    return () => {}
  }, [imageId])

  return <Wrapper width={width} height={height} ref={elRef} />
}
