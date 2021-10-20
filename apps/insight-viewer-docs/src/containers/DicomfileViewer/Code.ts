export const CODE = `\
import { useRef } from 'react'
import InsightViewer, { useImage, useDicomFile } from '@lunit/insight-viewer'

const style = {
  width: '500px',
  height: '500px'
}

export default function App() {
  const { imageId, handleFileChange } = useDicomFile()
  const { image } = useImage({
    dicomfile: imageId,
  })

  return (
    <>
      <input
        type="file"
        accept="application/dicom"
        hidden
        onChange={handleFileChange}
      />
      <div style={style}> // Wrapper size is required because InsightViewer's width/height is '100%'.
        <InsightViewer image={image} />
      </div>
    </>
  )
}
`
