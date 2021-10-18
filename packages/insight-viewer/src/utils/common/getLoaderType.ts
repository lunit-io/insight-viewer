import { ImageId, LoaderType } from '../../types'
import { IMAGE_TYPE, LOADER_TYPE } from '../../const'

export function getLoaderType(obj: ImageId): LoaderType {
  if (obj[IMAGE_TYPE.WEB]) return LOADER_TYPE.WEB
  return LOADER_TYPE.DICOM
}
