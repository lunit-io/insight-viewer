import { useDicomViewer } from './useDicomViewer';

interface DicomViewerProps {
  imageIds: string[];
  width?: React.CSSProperties['width'];
  height?: React.CSSProperties['height'];
}

export const DicomViewer = (props: DicomViewerProps) => {
  const { viewerElementRef } = useDicomViewer({
    imageIds: props.imageIds ?? [],
  });

  return (
    <div
      ref={viewerElementRef}
      id="dicom-viewer-wrapper"
      style={{ width: props.width ?? '500px', height: props.height ?? '500px' }}
    />
  );
};
