/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../@types/cornerstone-core/index.d.ts" />
/// <reference path="../@types/cornerstone-web-image-loader/index.d.ts" />
import { useEffect } from 'react'
import cornerstone from 'cornerstone-core'
import cornerstoneWebImageLoader from 'cornerstone-web-image-loader'

export default function useWebImageLoader(): void {
  useEffect(() => {
    cornerstoneWebImageLoader.external.cornerstone = cornerstone
  }, [])
}
