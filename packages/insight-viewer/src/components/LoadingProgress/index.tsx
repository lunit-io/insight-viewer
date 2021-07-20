import React, { useEffect, useState } from 'react'
import { Subscription } from 'rxjs'
import { loadingProgressMessage } from '../../utils/messageService'
import { ProgressComponent } from '../../types'

let subscription: Subscription

const style = {
  position: 'absolute',
  top: '50%',
  width: '100%',
  transform: 'translateY(-50%)',
  textAlign: 'center',
} as const

export default function LoadingProgress({
  Progress,
}: {
  Progress: ProgressComponent
}): JSX.Element {
  const [{ progress, hidden, initialized }, setState] = useState<{
    progress?: number
    hidden: boolean
    initialized: boolean
  }>({
    progress: undefined,
    hidden: true,
    initialized: false,
  })

  useEffect(() => {
    subscription = loadingProgressMessage
      .getMessage()
      .subscribe(({ message, loaded }) => {
        setState(prev => ({
          ...prev,
          progress: message,
          initialized: loaded || false,
        }))
      })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (initialized) {
      setState(prev => ({ ...prev, hidden: true }))
    }

    if (progress === 0) {
      setState(prev => ({ ...prev, hidden: false }))
    }
  }, [progress, initialized])

  const viewerState = [
    !hidden ? 'loading' : '',
    initialized ? 'initialized' : '',
  ]
    .join(' ')
    .trim()

  return (
    <div
      style={style}
      data-cy={viewerState} // For Cypress test.
    >
      {!hidden && <Progress progress={progress ?? 0} />}
    </div>
  )
}
