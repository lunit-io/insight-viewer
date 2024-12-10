import { useMemo } from 'react';
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

  const memoizedViewerElementStyle = useMemo(() => {
    return {
      width: props.width ?? '500px',
      height: props.height ?? '500px',
    };
  }, [props.width, props.height]);

  return (
    <div
      ref={viewerElementRef}
      id="dicom-viewer-wrapper"
      style={memoizedViewerElementStyle}
    />
  );
};
