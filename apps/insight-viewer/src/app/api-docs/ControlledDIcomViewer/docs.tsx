import { useDicomViewer } from '@lunit-insight-viewer/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { imageIds } from '../../image';

export function ControlledViewer() {
  const { viewerElementRef, viewerStatus, setViewerStatus } = useDicomViewer({
    imageIds,
  });

  const handleRotateButtonClick = () => {
    setViewerStatus((prev) => {
      if (!prev) return null;

      const { rotation } = prev.viewport.properties;

      return {
        ...prev,
        viewport: {
          ...prev.viewport,
          properties: {
            ...prev.viewport.properties,
            rotation: typeof rotation === 'number' ? rotation + 30 : 0,
          },
        },
      };
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h1>Controlled Component</h1>
      <div style={{ width: '500px', height: '500px' }} ref={viewerElementRef} />
      <button style={{ width: '100px' }} onClick={handleRotateButtonClick}>
        Rotate 30
      </button>
      <div style={{ marginBottom: '8px' }}>
        current rotation: {viewerStatus?.viewport.properties.rotation}
      </div>
      <div style={{ width: '70%', marginTop: '16px' }}>
        <h2>Example Code</h2>
        <SyntaxHighlighter language="typescript">
          {codeString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

const codeString = `
import { useDicomViewer } from '@lunit-insight-viewer/react';

const imageIds = [
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000000.dcm',
];

export function ControlledViewer() {
  const { viewerElementRef, viewerStatus, setViewerStatus } = useDicomViewer({
    imageIds,
  });

  const handleRotateButtonClick = () => {
    setViewerStatus((prev) => {
      if (!prev) return null;

      const { rotation } = prev.viewport.properties;

      return {
        ...prev,
        viewport: {
          ...prev.viewport,
          properties: {
            ...prev.viewport.properties,
            rotation: typeof rotation === 'number' ? rotation + 30 : 0,
          },
        },
      };
    });
  };

  return (
    <>
      <div style={{ width: '500px', height: '500px' }} ref={viewerElementRef} />
      <button onClick={handleRotateButtonClick}>Rotate 30</button>
      <div>
        current rotation: {viewerStatus?.viewport.properties.rotation}
      </div>
    </>
  );
}
`;
