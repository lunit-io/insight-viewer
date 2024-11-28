import { NewDicomViewer, useDicomViewer } from '@lunit-insight-viewer/react';

import { imageIds } from './image';

export function LowLevelDicomViewerWithHook() {
  const { viewerRef } = useDicomViewer({
    imageIds,
  });

  return (
    <div style={{ width: '500px', height: '500px' }}>
      <NewDicomViewer ref={viewerRef} />;
    </div>
  );
}

export function HighLevelDicomViewerWithHook() {
  return (
    <div style={{ width: '500px', height: '500px' }}>
      <NewDicomViewer imageIds={imageIds} />
    </div>
  );
}
