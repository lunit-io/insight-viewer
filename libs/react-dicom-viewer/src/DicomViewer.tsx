import { useDicomViewer } from './useDicomViewer';

interface DicomViewerProps {
  imageIds?: string[];
}

export const DicomViewer = (props: DicomViewerProps) => {
  const { viewerRef } = useDicomViewer({
    imageIds: props.imageIds ?? [],
  });

  return (
    <div
      ref={viewerRef}
      id="dicom-viewer-wrapper"
      style={{ width: '100%', height: '100%' }}
    />
  );
};
