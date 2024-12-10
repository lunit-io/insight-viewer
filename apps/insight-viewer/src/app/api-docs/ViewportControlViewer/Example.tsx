import { useState } from 'react';
import { useDicomViewer } from '@lunit-insight-viewer/react';

import { imageIds, tool as defaultTool } from '../../image';

import type { Tool } from '@lunit-insight-viewer/core';

export function ViewportControlViewer() {
  const [tool, setTool] = useState<Tool>({
    pan: 'wheelDrag',
  });
  const { viewerElementRef } = useDicomViewer({
    imageIds,
    tool,
  });

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
        <button onClick={() => setTool(defaultTool)}>기본 툴</button>
        <button onClick={() => setTool(null)}>비어있는 툴</button>
        <button onClick={() => setTool({ frame: 'wheel' })}>
          프레임 툴 with wheel
        </button>
        <button onClick={() => setTool({ pan: 'wheelDrag' })}>
          팬 툴 with wheelDrag
        </button>
        <button onClick={() => setTool({ windowing: 'primaryDrag' })}>
          윈도우링 툴 with primaryDrag
        </button>
        <button onClick={() => setTool({ zoom: 'secondaryDrag' })}>
          줌 툴 with secondaryDrag
        </button>
      </div>
      <div style={{ width: '500px', height: '500px' }} ref={viewerElementRef} />
    </div>
  );
}
