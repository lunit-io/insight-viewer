import React, { useEffect, useState } from 'react'
import { Subscription, merge } from 'rxjs'
import {
  loadingProgressMessage,
  loadedCountMessageMessage,
} from '../../utils/messageService'
import { ProgressComponent } from '../../types'

let subscription: Subscription

const style = {
  position: 'absolute',
  top: '50%',
  width: '100%',
  transform: 'translateY(-50%)',
  textAlign: 'center',
} as const

/**
 * Calculate progress status value for single/multiple image(s) fetching.
 * @param {number} loadedCount The count of loaded images.
 * @param {number} totalCount The length of images to load.
 * @param {number} progress The progress status of image to be loading. Repeat 0 to 100 for each new image fetching.
 * @returns {number} Total progress. When all images are loaded, return 100. Otherwise, round down.
 */
export function getProgress({
  loadedCount,
  totalCount,
  progress,
}: {
  loadedCount: number
  totalCount: number
  progress: number
}): number {
  const calculated = (loadedCount * 100 + (progress ?? 0)) * (1 / totalCount)
  return loadedCount === totalCount ? 100 : Math.floor(calculated)
}

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
    const $progress = loadingProgressMessage.getMessage()
    const $loadedCount = loadedCountMessageMessage.getMessage()

    let loadedCount = 0
    let totalCount = 1
    let _progress = 0

    subscription = merge($progress, $loadedCount).subscribe(prop => {
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
