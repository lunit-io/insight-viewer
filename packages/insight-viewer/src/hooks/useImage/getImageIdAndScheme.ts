import { IMAGE_LOADER_SCHEME } from 'const'
import { ImageId, ImageLoaderScheme } from 'types'

export interface ImageIdAndScheme {
  id: string | undefined
  scheme: ImageLoaderScheme | undefined
}

export function getItem(item: string | string[] | undefined): string | undefined {
  if (item === undefined) return undefined
  if (Array.isArray(item)) return item[0]
  return item
}

export function getImageIdAndScheme(image: ImageId): ImageIdAndScheme {
  if (image[IMAGE_LOADER_SCHEME.WADO])
    return {
      id: getItem(image[IMAGE_LOADER_SCHEME.WADO]),
      scheme: IMAGE_LOADER_SCHEME.WADO,
    }
  if (image[IMAGE_LOADER_SCHEME.DICOMFILE])
    return {
      id: getItem(image[IMAGE_LOADER_SCHEME.DICOMFILE]),
      scheme: IMAGE_LOADER_SCHEME.DICOMFILE,
    }
  if (image[IMAGE_LOADER_SCHEME.WEB])
    return {
      id: getItem(image[IMAGE_LOADER_SCHEME.WEB]),
      scheme: IMAGE_LOADER_SCHEME.WEB,
    }
  return {
    id: undefined,
    scheme: undefined,
  }
}
