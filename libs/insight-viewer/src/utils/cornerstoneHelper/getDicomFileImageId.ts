import { CONFIG } from '../../const'
import setWadoImageLoader from './setWadoImageLoader'

export function getDicomFileImageId(file: File): Promise<string> {
  async function getImageId() {
    const imageLoader = await setWadoImageLoader(CONFIG.onError)
    return imageLoader?.wadouri.fileManager.add(file) ?? ''
  }
  return getImageId()
}
