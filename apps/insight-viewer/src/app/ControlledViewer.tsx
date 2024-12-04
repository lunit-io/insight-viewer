import { useDicomViewer } from '@lunit-insight-viewer/react';

import { imageIds, tools } from './image';
import { useEffect } from 'react';

export function ControlledViewer() {
  const { viewerElementRef, viewerStatus, setViewerStatus } = useDicomViewer({
    imageIds,
    tools,
  });

  useEffect(() => {
    console.log('viewport changed', viewerStatus?.viewport.properties.rotation);
  }, [viewerStatus?.viewport]);

  useEffect(() => {
    console.log('image changed', viewerStatus?.image);
  }, [viewerStatus?.image]);

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
    <div style={{ width: '500px', height: '500px' }}>
      <div style={{ width: '100%', height: '100%' }} ref={viewerElementRef} />
      <button onClick={handleRotateButtonClick}>Rotate 30</button>
      <div style={{ marginBottom: '8px' }}>
        {viewerStatus?.viewport.properties.rotation}
      </div>
    </div>
  );
}
