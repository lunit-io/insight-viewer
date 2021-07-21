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
  const [{ progress, hidden }, setState] = useState<{
    progress?: number
    hidden: boolean
  }>({
    progress: undefined,
    hidden: true,
  })

  useEffect(() => {
    let isCancelled = false

    subscription = loadingProgressMessage.getMessage().subscribe(message => {
      if (!isCancelled)
        setState(prev => ({
          ...prev,
          progress: message,
        }))
    })

    return () => {
      isCancelled = true
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
    <div
      style={style}
      data-cy={!hidden ? 'loading' : ''} // For Cypress test.
    >
      {!hidden && <Progress progress={progress ?? 0} />}
    </div>
  )
}
