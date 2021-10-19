import { useState } from 'react'
import { getDicomFileImageId } from '../../utils/cornerstoneHelper/getDicomFileImageId'

export function useDicomFile(): {
  imageId: string
  setImageId: (file: File) => void
} {
  const [imageId, updateImageId] = useState<string>('')

  function setImageId(file: File) {
    getDicomFileImageId(file).then(imgId => {
      updateImageId(imgId)
    })
  }

  return {
    imageId,
    setImageId,
  }
}
