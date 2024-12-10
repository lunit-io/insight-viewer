import { useDicomViewer } from '@lunit-insight-viewer/react';

import { imageIds, tool as defaultTool } from '../../image';

import type { Tool } from '@lunit-insight-viewer/core';

export function ViewportControlViewer() {
  const { viewerElementRef, viewerStatus, setViewerStatus } = useDicomViewer({
    imageIds,
    defaultViewerStatus: {
      tool: { frame: 'wheel' },
    },
  });

  const handleSetTool = (tool: Tool) => {
    setViewerStatus((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        tool,
      };
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginTop: '10px',
      }}
    >
      <div style={{ display: 'flex', gap: '10px', width: '80%' }}>
        <button onClick={() => handleSetTool(defaultTool)}>기본 툴</button>
        <button onClick={() => handleSetTool(null)}>비어있는 툴</button>
        <button onClick={() => handleSetTool({ frame: 'wheel' })}>
          프레임 툴 with wheel
        </button>
        <button onClick={() => handleSetTool({ pan: 'wheelDrag' })}>
          팬 툴 with wheelDrag
        </button>
        <button onClick={() => handleSetTool({ windowing: 'primaryDrag' })}>
          윈도우링 툴 with primaryDrag
        </button>
        <button onClick={() => handleSetTool({ zoom: 'secondaryDrag' })}>
          줌 툴 with secondaryDrag
        </button>
      </div>
      <div style={{ width: '500px', height: '500px' }} ref={viewerElementRef} />
      <p>
        current tool:{' '}
        {viewerStatus?.tool ? JSON.stringify(viewerStatus.tool) : 'null'}
      </p>
    </div>
  );
}
