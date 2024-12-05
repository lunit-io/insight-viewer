import { useState } from 'react';

import { ControlledViewer } from './api-docs/ControlledDIcomViewer/docs';

function App() {
  const [docs, setDocs] = useState<string>('');
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
