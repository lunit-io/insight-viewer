import { useState } from 'react'
import { Viewport } from '../types'

type HandleViewport = (key: string, value: unknown) => void

export interface UseViewport {
  (): Viewport & {
    setViewport: HandleViewport
  }
}

const useViewport: UseViewport = () => {
  const [{ invert, hflip, vflip }, setViewport] = useState({
    invert: false,
    hflip: false,
    vflip: false,
  })

  const handleViewport: HandleViewport = (name, value) => {
    setViewport(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  return {
    invert,
    hflip,
    vflip,
    setViewport: handleViewport,
  }
}

export default useViewport
