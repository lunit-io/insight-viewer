import { useState } from 'react';
import { DicomViewer } from '@lunit-insight-viewer/react';

import { imageIds, tools as defaultTools } from '../../image';

export function ViewportControlViewer() {
  const [tools, setTools] = useState(defaultTools);

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
        <button onClick={() => setTools(defaultTools)}>기본 툴</button>
        <button onClick={() => setTools([])}>비어있는 툴</button>
        <button onClick={() => setTools([{ tool: 'frame' }])}>프레임 툴</button>
        <button onClick={() => setTools([{ tool: 'pan' }])}>팬 툴</button>
        <button onClick={() => setTools([{ tool: 'windowing' }])}>
          윈도우링 툴
        </button>
        <button onClick={() => setTools([{ tool: 'zoom' }])}>줌 툴</button>
      </div>
      <DicomViewer imageIds={imageIds} tools={tools} />
    </div>
  );
}
