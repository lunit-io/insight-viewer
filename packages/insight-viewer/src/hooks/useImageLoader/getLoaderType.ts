import { IMAGE_TYPE, LOADER_TYPE } from '../../const'
import { ImageId, LoaderType } from '../../types'

export function getLoaderType(obj: ImageId): LoaderType {
  if (obj[IMAGE_TYPE.WEB]) return LOADER_TYPE.WEB
  return LOADER_TYPE.DICOM
}
