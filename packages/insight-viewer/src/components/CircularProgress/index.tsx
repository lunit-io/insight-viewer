import React from 'react'
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

export default function Progress({
  progress = 0,
}: {
  progress: number
}): JSX.Element {
  return (
    <CircularProgress
      value={progress}
      size={100}
      style={{ height: 100, fontSize: 80, color: '#fff' }}
    >
      <CircularProgressLabel>{progress}%</CircularProgressLabel>
    </CircularProgress>
  )
}
