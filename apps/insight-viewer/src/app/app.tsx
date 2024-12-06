import { useState } from 'react';

import { ControlledViewer } from './api-docs/ControlledDIcomViewer/docs';

// TODO: 향후 docusaurus 로 대체
function App() {
  const [docs, setDocs] = useState<string>('ControlledViewer');
  return (
    <div>
      <button onClick={() => setDocs('ControlledViewer')}>
        ControlledViewer
      </button>
      {docs === 'ControlledViewer' && <ControlledViewer />}
    </div>
  );
}

export default App;
