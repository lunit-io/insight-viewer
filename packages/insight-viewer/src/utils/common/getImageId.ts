import { IMAGE_TYPE } from '../../const'
import { ImageId } from '../../types'

export function getItem(
  item: string | string[] | undefined
): string | undefined {
  if (item === undefined) return undefined
  if (Array.isArray(item)) return item[0]
  return item
}

export function getItems(item: string | string[] | undefined): string[] {
  if (item === undefined) return []
  if (Array.isArray(item)) return item
  return [item]
}

export function getImageId(image: ImageId): string | undefined {
  if (image[IMAGE_TYPE.WADO]) return getItem(image[IMAGE_TYPE.WADO])
  if (image[IMAGE_TYPE.DICOMFILE]) return getItem(image[IMAGE_TYPE.DICOMFILE])
  if (image[IMAGE_TYPE.WEB]) return getItem(image[IMAGE_TYPE.WEB])
  return undefined
}

export function getImageIds(image: ImageId): string[] | undefined {
  if (image[IMAGE_TYPE.WADO]) return getItems(image[IMAGE_TYPE.WADO])
  if (image[IMAGE_TYPE.DICOMFILE]) return getItems(image[IMAGE_TYPE.DICOMFILE])
  if (image[IMAGE_TYPE.WEB]) return getItems(image[IMAGE_TYPE.WEB])
  return []
}
