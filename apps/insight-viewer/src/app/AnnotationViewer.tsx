import { useState } from 'react';
import { DicomViewer } from '@lunit-insight-viewer/react';

import { imageIds } from './image';

import type {
  MappingToolWithKey,
  ViewerSnapshot,
} from '@lunit-insight-viewer/core';

const LENGTH_TOOL = { tool: 'length' } as const;
const CIRCLE_TOOL = { tool: 'circle' } as const;
const POINT_TOOL = { tool: 'point' } as const;

export function AnnotationViewer() {
  const [viewerInfo, setViewerInfo] = useState<ViewerSnapshot>(null);
  const [viewerTools, setViewerTools] = useState<MappingToolWithKey[]>([
    LENGTH_TOOL,
  ]);

  const handleDicomViewerChange = (viewerInfo: ViewerSnapshot) => {
    setViewerInfo(viewerInfo);
  };

  return (
    <div style={{ width: '500px', height: '500px' }}>
      <DicomViewer
        tools={viewerTools}
        imageIds={imageIds}
        viewerInfo={viewerInfo}
        onChange={handleDicomViewerChange}
      />
      <button onClick={() => setViewerTools([LENGTH_TOOL])}>Length</button>
      <button onClick={() => setViewerTools([CIRCLE_TOOL])}>Circle</button>
      <button onClick={() => setViewerTools([POINT_TOOL])}>Point</button>
    </div>
  );
}
