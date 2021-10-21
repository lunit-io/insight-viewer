import { useState } from 'react'
import { getDicomFileImageId } from '../../utils/cornerstoneHelper/getDicomFileImageId'

export function useDicomFile(): {
  imageId: string
  setImageIdByFile: (file: File) => void
} {
  const [imageId, setImageId] = useState<string>('')

  function setImageIdByFile(file: File) {
    getDicomFileImageId(file).then(imgId => {
      setImageId(imgId ?? '')
    })
  }

  return {
    imageId,
    setImageIdByFile,
  }
}
