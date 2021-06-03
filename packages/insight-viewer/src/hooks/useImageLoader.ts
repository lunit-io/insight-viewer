import { useEffect, useState, useContext } from 'react'
import loadAndDisplayImage from '../utils/cornerstoneHelper/loadAndDisplayImage'
import LoaderContext from '../Context'
import useViewport from './useViewport'
import { Element } from '../types'

interface Prop {
  imageId: string
  element: Element
  setLoader: () => Promise<boolean>
  isSingleImage?: boolean
}

export default function useImageLoader({
  imageId,
  element,
  setLoader,
  isSingleImage = true,
}: Prop): void {
  const [hasLoader, setHasLoader] = useState(false)
  const { onError, setHeader } = useContext(LoaderContext)

  // eslint-disable-next-line no-extra-semi
  ;(async function asyncLoad(): Promise<undefined> {
    if (hasLoader) return undefined
    setHasLoader(await setLoader())
    return undefined
  })()

  useViewport(<HTMLDivElement>element)

  useEffect(() => {
    if (!hasLoader) return undefined
    if (!element) return undefined

    loadAndDisplayImage({
      imageId,
      element,
      onError,
      setHeader,
      isSingleImage,
    })
    return undefined
  }, [imageId, element, isSingleImage, hasLoader, onError, setHeader])
  return undefined
}
