export const CODE = `\
import { useRef } from 'react'
import InsightViewer, { useImage, getDicomFileImageId } from '@lunit/insight-viewer'

const style = {
  width: '500px',
  height: '500px'
}

export default function App() {
  const { imageId } = useFileInput()
  const { image } = useImage({
    dicomfile: imageId,
  })
  const [imageId, setImageId] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (f: File) => {
    getDicomFileImageId(f).then(imgId => {
      setImageId(imgId ?? '')
    })
  }

  return (
    <>
    <input
      type="file"
      accept="application/dicom"
      hidden
      onChange={handleFile}
      ref={inputRef}
    />
  <div style={style}> // Wrapper size is required because InsightViewer's width/height is '100%'.
    <InsightViewer image={image} />
    </>
  )
}
`
