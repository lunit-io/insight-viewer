import { useState } from 'react';
import { DicomViewer } from '@lunit-insight-viewer/react';

import { imageIds, tool as defaultTool } from '../../image';

export function ViewportControlViewer() {
  const [tool, setTool] = useState(defaultTool);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginTop: '10px',
      }}
    >
      <div style={{ display: 'flex', gap: '10px', width: '50%' }}>
        <button onClick={() => setTool(defaultTool)}>기본 툴</button>
        <button onClick={() => setTool(null)}>비어있는 툴</button>
        <button onClick={() => setTool({ frame: 'wheel' })}>프레임 툴</button>
        <button onClick={() => setTool({ pan: 'wheelDrag' })}>팬 툴</button>
        <button onClick={() => setTool({ windowing: 'primaryDrag' })}>
          윈도우링 툴
        </button>
        <button onClick={() => setTool({ zoom: 'secondaryDrag' })}>
          줌 툴
        </button>
      </div>
      <DicomViewer imageIds={imageIds} tool={tool} />
    </div>
  );
}
