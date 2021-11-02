import { useState } from 'react'
import { getDicomFileImageId } from '../../utils/cornerstoneHelper/getDicomFileImageId'

export function useDicomFile(): {
  imageId: string
  setImageIdByFile: (file: File) => void
  file: File | undefined
} {
  const [{ imageId, file }, setState] = useState({
    imageId: '',
    file: undefined,
  })

  function setImageIdByFile(f: File) {
    getDicomFileImageId(f).then(imgId => {
      setState({
        imageId: imgId,
        file,
      })
    })
  }

  return {
    imageId,
    setImageIdByFile,
    file,
  }
}
