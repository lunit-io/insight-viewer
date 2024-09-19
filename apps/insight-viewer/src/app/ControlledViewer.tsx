import { useState } from 'react';
import { DicomViewer } from '@lunit-insight-viewer/react';

import { imageIds, tools } from './image';

import type { ViewerSnapshot } from '@lunit-insight-viewer/core';

export function ControlledViewer() {
  const [viewerInfo, setViewerInfo] = useState<ViewerSnapshot>(null);

  const handleRotateButtonClick = () => {
    if (!viewerInfo) return;

    const clonedViewerInfo = { ...viewerInfo };

    const { rotation } = clonedViewerInfo.viewport.getProperties();

    clonedViewerInfo.viewport.setProperties({
      rotation: typeof rotation === 'number' ? rotation + 30 : 0,
    });

    setViewerInfo(clonedViewerInfo);
  };

  const handleDicomViewerChange = (viewerInfo: ViewerSnapshot) => {
    setViewerInfo(viewerInfo);
  };

  return (
    <div style={{ width: '500px', height: '500px' }}>
      <DicomViewer
        tools={tools}
        imageIds={imageIds}
        viewerInfo={viewerInfo}
        onChange={handleDicomViewerChange}
      />
      <button onClick={handleRotateButtonClick}>Move</button>
      <div style={{ marginBottom: '8px' }}>
        {JSON.stringify(viewerInfo?.viewport.getProperties())}
      </div>
      <div>{JSON.stringify(viewerInfo?.viewport.getCamera())}</div>
    </div>
  );
}
