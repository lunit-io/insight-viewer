import { useDicomViewer } from './useDicomViewer';

import type { MappingToolWithKey } from '@lunit-insight-viewer/core';

interface DicomViewerProps {
  imageIds: string[];
  tools?: MappingToolWithKey[];
  width?: React.CSSProperties['width'];
  height?: React.CSSProperties['height'];
}

export const DicomViewer = (props: DicomViewerProps) => {
  const { viewerElementRef } = useDicomViewer({
    imageIds: props.imageIds,
    tools: props.tools,
  });

  return (
    <div
      ref={viewerElementRef}
      id="dicom-viewer-wrapper"
      style={{ width: props.width ?? '500px', height: props.height ?? '500px' }}
    />
  );
};
