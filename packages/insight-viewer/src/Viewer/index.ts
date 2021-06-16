import { DICOMImageViewer } from './DICOMImageViewer'
import { WebImageViewer } from './WebImageViewer'

const Viewer = {
  Dicom: DICOMImageViewer,
  Web: WebImageViewer,
}

export default Viewer
