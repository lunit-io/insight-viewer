import { useState } from 'react';

import { ControlledViewer } from './api-docs/ControlledDIcomViewer/docs';
import { DicomViewerDocs } from './api-docs/DicomViewer/docs';

type DocsType = 'ControlledViewer' | 'DicomViewer';

// TODO: 향후 docusaurus 로 대체
function App() {
  const [docs, setDocs] = useState<DocsType>('DicomViewer');

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => setDocs('DicomViewer')}>DicomViewer</button>
        <button onClick={() => setDocs('ControlledViewer')}>
          ControlledViewer
        </button>
      </div>
      {docs === 'ControlledViewer' && <ControlledViewer />}
      {docs === 'DicomViewer' && <DicomViewerDocs />}
    </div>
  );
}

export default App;
