/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../@types/cornerstone-core/index.d.ts" />
/// <reference path="../@types/cornerstone-wado-image-loader/index.d.ts" />
import { useEffect } from 'react'
import cornerstone from 'cornerstone-core'
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader'
import dicomParser from 'dicom-parser'

export default function useWADOImageLoader(): void {
  useEffect(() => {
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser
  }, [])
}
