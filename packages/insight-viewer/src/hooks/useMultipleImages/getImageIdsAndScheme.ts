import { IMAGE_LOADER_SCHEME } from '../../const'
import { ImageId, ImageLoaderScheme } from '../../types'

export interface ImageIdsAndScheme {
  ids: string[] | undefined
  scheme: ImageLoaderScheme | undefined
}

export function getItems(item: string | string[] | undefined): string[] {
  if (item === undefined) return []
  if (Array.isArray(item)) return item
  return [item]
}

export function getImageIdsAndScheme(image: ImageId): ImageIdsAndScheme {
  if (image[IMAGE_LOADER_SCHEME.WADO])
    return {
      ids: getItems(image[IMAGE_LOADER_SCHEME.WADO]),
      scheme: IMAGE_LOADER_SCHEME.WADO,
    }
  if (image[IMAGE_LOADER_SCHEME.DICOMFILE])
    return {
      ids: getItems(image[IMAGE_LOADER_SCHEME.DICOMFILE]),
      scheme: IMAGE_LOADER_SCHEME.DICOMFILE,
    }
  if (image[IMAGE_LOADER_SCHEME.WEB])
    return {
      ids: getItems(image[IMAGE_LOADER_SCHEME.WEB]),
      scheme: IMAGE_LOADER_SCHEME.WEB,
    }
  return {
    ids: [],
    scheme: undefined,
  }
}
