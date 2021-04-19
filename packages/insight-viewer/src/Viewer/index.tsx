import React from 'react'
import Wrapper from '../components/Wrapper'
import { WithChildren } from '../types'

const DEFAULT_SIZE = '100%'

export type Prop = WithChildren<{
  size?:
    | { width: number; height: number }
    | { width: typeof DEFAULT_SIZE; height: typeof DEFAULT_SIZE }
}>

export default function Viewer({
  size: { width, height } = { width: DEFAULT_SIZE, height: DEFAULT_SIZE },
}: Prop): JSX.Element {
  return (
    <Wrapper>
      <canvas width={width} height={height} />
    </Wrapper>
  )
}
