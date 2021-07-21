import { useState } from 'react'
import { OnError } from '../types'

export default function useImageLoader(
  loader: (onerror: OnError) => Promise<boolean>,
  onError: OnError
): boolean {
  const [hasLoader, setHasLoader] = useState(false)
  loader(onError).then(res => setHasLoader(res))
  return hasLoader
}
