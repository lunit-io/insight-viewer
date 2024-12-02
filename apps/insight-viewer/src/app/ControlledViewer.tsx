import { useDicomViewer, NewDicomViewer } from '@lunit-insight-viewer/react';

import { imageIds, tools } from './image';

export function ControlledViewer() {
  const { viewerRef, viewerInfo, setViewerInfo } = useDicomViewer({
    imageIds,
    tools,
    onViewportChange: (viewerInfo) => {
      console.log('viewport changed', viewerInfo?.viewport.properties.rotation);
    },
    onImageChange: (viewerInfo) => {
      console.log('image changed', viewerInfo?.image);
    },
  });

  const handleRotateButtonClick = () => {
    if (!viewerInfo) return;

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
      <NewDicomViewer ref={viewerRef} />
      <button onClick={handleRotateButtonClick}>Rotate 30</button>
      <div style={{ marginBottom: '8px' }}>
        {viewerInfo?.viewport.properties.rotation}
      </div>
    </div>
  );
}
