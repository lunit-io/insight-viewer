import React, { useEffect, useState } from 'react'
import { Subscription, merge } from 'rxjs'
import {
  loadingProgressMessage,
  loadedCountMessageMessage,
} from '../../utils/messageService'
import { getProgress } from '../../utils/common/getProgress'
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
    let isCancelled = false // Do not update state on unmount.
    const progress$ = loadingProgressMessage.getMessage()
    const loadedCount$ = loadedCountMessageMessage.getMessage()

    let loadedCount = 0
    let totalCount = 1
    let _progress = 0

    subscription = merge(progress$, loadedCount$).subscribe(prop => {
      if (typeof prop === 'number') {
        _progress = prop
      } else {
        loadedCount = prop.loaded
        totalCount = prop.total
      }

      if (!isCancelled)
        setState(prev => ({
          ...prev,
          progress: getProgress({
            loadedCount,
            totalCount,
            progress: _progress,
          }),
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
      data-cy-loading={!hidden ? 'loading' : ''} // For Cypress test.
    >
      {!hidden && <Progress progress={progress ?? 0} />}
    </div>
  )
}
