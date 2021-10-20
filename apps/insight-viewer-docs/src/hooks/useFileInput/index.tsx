import { useState } from 'react'
import { getDicomFileImageId } from '@lunit/insight-viewer'
import { FileInput as FileInputComponent } from './FileInput'

export function useFileInput(): {
  imageId: string
  FileInput: () => JSX.Element
} {
  const [imageId, setImageId] = useState<string>('')

  const handleFile = (f: File) => {
    getDicomFileImageId(f).then(imgId => {
      setImageId(imgId ?? '')
    })
  }

  function FileInput() {
    return <FileInputComponent onChange={handleFile} />
  }

  return {
    imageId,
    FileInput,
  }
}
