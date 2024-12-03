import { useDicomViewer, DicomViewer } from '@lunit-insight-viewer/react';

import { imageIds, tools } from './image';
import { useEffect } from 'react';

export function ControlledViewer() {
  const { viewerRef, viewerInfo, setViewerInfo } = useDicomViewer({
    imageIds,
    tools,
  });

  useEffect(() => {
    console.log('viewport changed', viewerInfo?.viewport.properties.rotation);
  }, [viewerInfo?.viewport]);

  useEffect(() => {
    console.log('image changed', viewerInfo?.image);
  }, [viewerInfo?.image]);

  const handleRotateButtonClick = () => {
    setViewerInfo((prev) => {
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
      <DicomViewer ref={viewerRef} />
      <button onClick={handleRotateButtonClick}>Rotate 30</button>
      <div style={{ marginBottom: '8px' }}>
        {viewerInfo?.viewport.properties.rotation}
      </div>
    </div>
  );
}
