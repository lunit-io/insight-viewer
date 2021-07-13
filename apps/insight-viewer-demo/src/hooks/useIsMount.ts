import { useState, useEffect } from 'react'

export default function useIsMount(): boolean {
  const [isMount, setIsMount] = useState(false)

  useEffect(() => {
    setIsMount(true)
  }, [])

  return isMount
}
