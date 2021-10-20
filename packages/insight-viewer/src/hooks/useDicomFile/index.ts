import { useState } from 'react'
import { getDicomFileImageId } from '../../utils/cornerstoneHelper/getDicomFileImageId'

export function useDicomFile(): {
  imageId: string
  handleFileChange: (file: File) => void
} {
  const [imageId, setImageId] = useState<string>('')

  function handleFileChange(file: File) {
    getDicomFileImageId(file).then(imgId => {
      setImageId(imgId ?? '')
    })
  }

  return {
    imageId,
    handleFileChange,
  }
}
