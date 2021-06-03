import { useEffect, useContext } from 'react'
import { Subscription } from 'rxjs'
import { multiframeMessage } from '../utils/messageService'
import loadAndDisplayImage from '../utils/cornerstoneHelper/loadAndDisplayImage'
import LoaderContext from '../Context'
import { Element } from '../types'

export interface UseFrame {
  (f?: number): {
    frame: number
    setFrame: (n: number) => void
  }
}

let subscription: Subscription

export default function useFrame(element: Element, imageIds: string[]): void {
  const { onError, setHeader } = useContext(LoaderContext)

  useEffect(() => {
    subscription = multiframeMessage.getMessage().subscribe(message => {
      loadAndDisplayImage({
        imageId: imageIds[message],
        element,
        onError,
        setHeader,
        isSingleImage: false,
      })
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [imageIds, element, onError, setHeader])
}
