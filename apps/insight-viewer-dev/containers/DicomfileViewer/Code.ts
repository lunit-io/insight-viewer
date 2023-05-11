export const CODE = `\
import InsightViewer, { useImage, useDicomFile } from '@lunit/insight-viewer'

const style = {
  width: '500px',
  height: '500px'
}

export default function App() {
  const { imageId, file, setImageIdByFile } = useDicomFile()
  const { image } = useImage({
    dicomfile: imageId,
  })

  return (
    <>
      <input
        type="file"
        accept="application/dicom"
        onChange={setImageIdByFile}
      /> {file?.name}
      <div style={style}> // Wrapper size is required because InsightViewer's width/height is '100%'.
        <InsightViewer image={image} />
      </div>
    </>
  )
}
`
