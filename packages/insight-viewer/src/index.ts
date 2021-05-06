import { DICOMImageViewer, WebImageViewer } from './Viewer'

type Viewer = ({ imageId }: { imageId: string }) => JSX.Element

export default function useInsightViewer(): {
  DICOMImageViewer: Viewer
  WebImageViewer: Viewer
} {
  return {
    DICOMImageViewer,
    WebImageViewer,
  }
}
