import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Subscription } from 'rxjs'
import { loadingProgressMessage } from '../../utils/messageService'
import { Progress as ProgressType } from '../../types'

const ProgressWrapper = styled.div`
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);
  text-align: center;
`

let subscription: Subscription

export default function LoadingProgress({
  Progress,
}: {
  Progress: ProgressType
}): JSX.Element {
  const [{ progress, hidden }, setState] = useState<{
    progress?: number
    hidden: boolean
  }>({
    progress: undefined,
    hidden: true,
  })

  useEffect(() => {
    subscription = loadingProgressMessage
      .getMessage()
      .subscribe((message: number) => {
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
      setState(prev => ({ ...prev, hidden: true }))
    }

    if (progress === 0) {
      setState(prev => ({ ...prev, hidden: false }))
    }
  }, [progress])

  return (
    <ProgressWrapper hidden={hidden}>
      <Progress progress={progress ?? 0} />
    </ProgressWrapper>
  )
}
