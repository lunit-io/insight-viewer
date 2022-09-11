import DicomImageViewer from './DicomImageViewer'
import WebImageViewer from './WebImageViewer'

function Basic(): JSX.Element {
  return (
    <>
      <DicomImageViewer />
      <WebImageViewer />
    </>
  )
}

export default Basic
