import { useDicomViewer } from './useDicomViewer';

interface DicomViewerProps {
  imageIds?: string[];
}

export const DicomViewer = (props: DicomViewerProps) => {
  const { viewerElementRef } = useDicomViewer({
    imageIds: props.imageIds ?? [],
  });

  return (
    <div
      ref={viewerElementRef}
      id="dicom-viewer-wrapper"
      style={{ width: '100%', height: '100%' }}
    />
  );
};
