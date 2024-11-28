import { useState } from 'react';
import { DicomViewer } from '@lunit-insight-viewer/react';

import { imageIds, tools } from './image';

import type { ViewerSnapshot } from '@lunit-insight-viewer/core';

export function ControlledViewer() {
  const [viewerInfo, setViewerInfo] = useState<ViewerSnapshot>(null);

  const handleRotateButtonClick = () => {
    if (!viewerInfo) return;

    const { properties } = viewerInfo.viewport;
    const { rotation } = properties;

    setViewerInfo({
      ...viewerInfo,
      viewport: {
        ...viewerInfo.viewport,
        properties: {
          ...properties,
          rotation: typeof rotation === 'number' ? rotation + 30 : 0,
        },
      },
    });
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
      <button onClick={handleRotateButtonClick}>Rotate 30</button>
      <div style={{ marginBottom: '8px' }}>
        {viewerInfo?.viewport.properties.rotation}
      </div>
    </div>
  );
}
