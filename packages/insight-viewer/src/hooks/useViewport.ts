import { useState } from 'react'
import { Viewport } from '../types'
import { ViewrportContextDefaultValue } from '../Context/Viewport'

type HandleViewport = (key: string, value: unknown) => void

export interface UseViewport {
  (): {
    viewport: Viewport
    setViewport: HandleViewport
  }
}

const useViewport: UseViewport = () => {
  const [{ invert, hflip, vflip }, setViewport] = useState(
    ViewrportContextDefaultValue
  )

  const handleViewport: HandleViewport = (name, value) => {
    setViewport(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  return {
    viewport: {
      invert,
      hflip,
      vflip,
    },
    setViewport: handleViewport,
  }
}

export default useViewport
