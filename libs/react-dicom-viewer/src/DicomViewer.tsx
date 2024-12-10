import { useDicomViewer } from './useDicomViewer';

import type { Tool } from '@lunit-insight-viewer/core';

interface DicomViewerProps {
  imageIds: string[];
  tool?: Tool;
  width?: React.CSSProperties['width'];
  height?: React.CSSProperties['height'];
}

export const DicomViewer = (props: DicomViewerProps) => {
  const { viewerElementRef } = useDicomViewer({
    imageIds: props.imageIds,
    defaultViewerStatus: {
      tool: props.tool,
    },
  });

  return (
    <div
      ref={viewerElementRef}
      id="dicom-viewer-wrapper"
      style={{ width: props.width ?? '500px', height: props.height ?? '500px' }}
    />
  );
};
