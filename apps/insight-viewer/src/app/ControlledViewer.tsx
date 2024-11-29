import { useDicomViewer, NewDicomViewer } from '@lunit-insight-viewer/react';

import { imageIds, tools } from './image';

export function ControlledViewer() {
  const { viewerRef, viewerInfo, setViewerInfo } = useDicomViewer({
    imageIds,
    tools,
    onViewportChange: (viewerInfo) => {
      console.log('camera changed', viewerInfo?.viewport.properties.rotation);
    },
    onImageChange: (viewerInfo) => {
      console.log('image changed', viewerInfo?.viewport.properties.rotation);
    },
  });

  const handleRotateButtonClick = () => {
    if (!viewerInfo) return;

    const { properties } = viewerInfo.viewport;
    const { rotation } = properties;

    setViewerInfo({
      ...viewerInfo,
      viewport: {
        ...viewerInfo.viewport,
        properties: {
          ...properties,
          rotation: typeof rotation === 'number' ? rotation + 30 : 0,
        },
      },
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
