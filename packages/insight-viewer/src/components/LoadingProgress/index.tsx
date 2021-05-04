import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Subscription } from 'rxjs'
import CircularProgress from '../CircularProgress'
import { lodingProgressMessage } from '../../utils/messageService'

const ProgressWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

let subscription: Subscription

export default function LoadingProgress(): JSX.Element {
  const [{ progress, hidden }, setState] = useState<{
    progress: number
    hidden: boolean
  }>({
    progress: 0,
    hidden: false,
  })

  useEffect(() => {
    subscription = lodingProgressMessage.getMessage().subscribe(message => {
      setState(prev => ({
        ...prev,
        progress: message,
      }))
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setState(prev => ({ ...prev, hidden: true }))
      }, 500)
    }

    if (progress === 0) {
      setState(prev => ({ ...prev, hidden: false }))
    }
  }, [progress])

  return (
    <ProgressWrapper hidden={hidden}>
      <CircularProgress progress={progress} />
    </ProgressWrapper>
  )
}
