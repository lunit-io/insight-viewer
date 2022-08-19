declare type Cornerstone = typeof import('cornerstone-core').default
declare type DicomParser = typeof import('dicom-parser')

declare module 'cornerstone-wado-image-loader' {
  const external: {
    cornerstone: Cornerstone
    dicomParser: DicomParser
  }

  const webWorkerManager: {
    initialize: (config: WebWorkerConfig) => void
    terminate: () => void
  }

  const wadouri: {
    dataSetCacheManager: {
      unload: (imageId: string) => void
    }
    fileManager: {
      add: (file: File) => string
    }
  }

  const wadors: {
    metaData: {
      getNumberString: (element: unknown, index?: number, defaultValue?: string) => unknown
      getNumberValue: (element: unknown, index?: number) => unknown
      getNumberValues: (element: unknown, minimumLength?: number) => unknown
      getValue: (element: unknown, index?: number, defaultValue?: string) => unknown
      metaDataProvider: (type: string, imageId: string) => unknown
    }
    findIndexOfString: (data: unknown, str: string, offset?: number) => number
    getPixelData: (
      uri,
      imageId,
      mediaType?: string
    ) => Promise<{
      contentType: string
      imageFrame: { pixelData: Uint8Array }
    }>
    loadImage: (imageId: string, options: unknown) => Promise<cornerstone.Image>
    metaDataManager: {
      add: (imageId: string, metadata: unknown) => void
      get: (imageId: string) => unknown
      remove: (imageId: string) => void
      purge: () => void
    }
    register: (_cornerstone: typeof cornerstone) => void
  }

  export { external, webWorkerManager, wadouri, wadors }
  export interface WebWorkerConfig {
    maxWebWorkers?: number
    startWebWorkersOnDemand?: boolean
    webWorkerTaskPaths?: string[]
    taskConfiguration?: {
      decodeTask?: {
        initializeCodecsOnStartup?: boolean
        usePDFJS?: false
        strict?: boolean
      }
      sleepTask?: {
        sleepTime?: number
      }
    }
  }
}
