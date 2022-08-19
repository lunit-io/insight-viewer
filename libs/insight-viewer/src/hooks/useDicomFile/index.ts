import { useState } from 'react'
import { getDicomFileImageId } from '../../utils/cornerstoneHelper/getDicomFileImageId'

interface State {
  imageId: string
  file: File | undefined
}

export function useDicomFile(): {
  setImageIdByFile: (file: File) => void
} & State {
  const [{ imageId, file }, setState] = useState<State>({
    imageId: '',
    file: undefined,
  })

  function setImageIdByFile(f: File) {
    getDicomFileImageId(f).then((imgId) => {
      setState({
        imageId: imgId,
        file: f,
      })
    })
  }

  return {
    imageId,
    setImageIdByFile,
    file,
  }
}
