import { useDicomViewer } from '@lunit-insight-viewer/react';

const imageIds = [
  'wadouri:https://static.lunit.io/insight/samples/cxr/Nodule.dcm',
];

/**
 * @description
 * - Controlled Component Example
 * - useDicomViewer 를 사용하여 외부에서 상태를 직접 핸들링하는 방식
 * - useDicomViewer 의 setViewerStatus 를 통해 상태를 직접 핸들링
 * - setViewerStatus, viewerStatus 는 react 의 state 와 동일한 개념으로 사용
 */
export function ControlledViewer() {
  const { viewerStatus, setViewerStatus, viewerElementRef } = useDicomViewer({
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
      <div>current rotation: {viewerStatus?.viewport.properties.rotation}</div>
    </>
  );
}
