import { useDicomViewer } from './useDicomViewer';

interface DicomViewerProps {
  imageIds: string[];
  style?: React.CSSProperties;
}

export const DicomViewer = (props: DicomViewerProps) => {
  const { viewerElementRef } = useDicomViewer({
    imageIds: props.imageIds ?? [],
  });

  return (
    <div
      ref={viewerElementRef}
      id="dicom-viewer-wrapper"
      style={{ width: '500px', height: '500px', ...props.style }}
    />
  );
};
