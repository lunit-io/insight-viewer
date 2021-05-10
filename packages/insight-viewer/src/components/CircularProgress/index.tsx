import React from 'react'
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/progress'
import { Progress as ProgressType } from '../../types'

const Progress: ProgressType = ({ progress = 0 }) => (
  <CircularProgress
    value={progress}
    size={100}
    style={{ height: 100, fontSize: 80, color: '#fff' }}
  >
    <CircularProgressLabel>{progress}%</CircularProgressLabel>
  </CircularProgress>
)

export default Progress
