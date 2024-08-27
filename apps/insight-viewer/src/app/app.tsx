import { useState } from 'react';

import { DicomViewer } from '@lunit-insight-viewer/react';

import type { MappingToolWithKey } from '@lunit-insight-viewer/core';

const imageIds = [
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000000.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000001.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000002.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000003.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000004.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000005.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000006.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000007.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000008.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000009.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000010.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000011.dcm',
  'wadouri:https://static.lunit.io/insight/samples/cxr/Nodule.dcm',
  'wadouri:https://static.lunit.io/insight/samples/mmg/case01_LCC.dcm',
];
const imageIds2 = [
  'wadouri:https://static.lunit.io/insight/samples/cxr/Nodule.dcm',
  'wadouri:https://static.lunit.io/insight/samples/mmg/case01_LCC.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000000.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000001.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000002.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000003.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000004.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000005.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000006.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000007.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000008.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000009.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000010.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000011.dcm',
  'wadouri:https://static.lunit.io/insight/samples/cxr/Nodule.dcm',
  'wadouri:https://static.lunit.io/insight/samples/mmg/case01_LCC.dcm',
];

const tools: MappingToolWithKey[] = [
  { tool: 'frame' },
  { tool: 'pan' },
  { tool: 'windowing' },
  { tool: 'zoom' },
];

function App() {
  const [value, setValue] = useState<boolean>(false);

  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <div style={{ display: 'flex', gap: 2, width: '500px', height: '500px' }}>
        <DicomViewer imageIds={imageIds} tools={tools} />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '500px',
          height: '500px',
        }}
      >
        <DicomViewer imageIds={value ? imageIds : imageIds2} tools={tools} />
        <button onClick={() => setValue((prev) => !prev)}>스위치</button>
      </div>
    </div>
  );
}

export default App;
