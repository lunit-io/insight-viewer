import { useState } from 'react';

import { ControlledViewer } from './api-docs/ControlledDIcomViewer/docs';
import { DicomViewerDocs } from './api-docs/DicomViewer/docs';
import { ViewportControlViewer } from './api-docs/ViewportControlViewer/Example';

type DocsType = 'ControlledViewer' | 'DicomViewer' | 'ViewportControlViewer';

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
        <button onClick={() => setDocs('ViewportControlViewer')}>
          ViewportControlViewer
        </button>
      </div>
      {docs === 'ControlledViewer' && <ControlledViewer />}
      {docs === 'DicomViewer' && <DicomViewerDocs />}
      {docs === 'ViewportControlViewer' && <ViewportControlViewer />}
    </div>
  );
}

export default App;
