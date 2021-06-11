import { useRef } from 'react'

function useThrottle<T extends unknown[]>(
  callback: (...params: T) => void,
  time: number
): () => void {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  return (...params: T) => {
    if (!timer.current) {
      timer.current = setTimeout(() => {
        callback(...params)
        timer.current = null
      }, time)
    }
  }
}

export default useThrottle
