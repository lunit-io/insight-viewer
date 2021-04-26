import React, { useEffect, useRef } from 'react'
import Wrapper from '../components/Wrapper'
import { WithChildren } from '../types'
import { init, dispose, loadImage } from '../modules/cornerstoneHelper'

type Prop = WithChildren<{
  imageId?: string
}>

export default function Viewer({ imageId }: Prop): JSX.Element {
  const elRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!imageId) return undefined
    if (!elRef || !elRef.current) return undefined
    const element = elRef.current

    init(elRef.current)
    loadImage(elRef.current, imageId)
    return () => {
      dispose(element)
    }
  }, [imageId])

  return <Wrapper ref={elRef} />
}
