import { useDicomViewer, DicomViewer } from '@lunit-insight-viewer/react';

/**
 * @description
 * - Low Level API Example 1
 * - useDicomViewer 를 사용하여 image, viewport 객체를
 * - 외부로 노출시키는 방식으로 외부에서 충분히 핸들링 할 수 있도록 하기 위함
 */
export function DicomViewerLowLevelExample1() {
  const { viewerElementRef, viewerStatus } = useDicomViewer({
    imageIds: [
      'wadouri:https://static.lunit.io/insight/samples/cxr/Nodule.dcm',
    ],
  });

  console.log('viewerStatus', viewerStatus);

  return (
    <div style={{ width: '500px', height: '500px' }} ref={viewerElementRef} />
  );
}

/**
 * @description
 * - Low Level API Example 2
 * - useDicomViewer 의 setViewerStatus 를 통해 외부에서 상태를 직접 핸들링하는 방식
 */
export function DicomViewerLowLevelExample2() {
  const { viewerElementRef, viewerStatus, setViewerStatus } = useDicomViewer({
    imageIds: [
      'wadouri:https://static.lunit.io/insight/samples/cxr/Nodule.dcm',
    ],
  });

  const handleRotateButtonClick = () => {
    if (!viewerStatus) return;

    const { properties } = viewerStatus.viewport;
    const { rotation } = properties;

    setViewerStatus({
      ...viewerStatus,
      viewport: {
        ...viewerStatus.viewport,
        properties: {
          ...properties,
          rotation: typeof rotation === 'number' ? rotation + 30 : 0,
        },
      },
    });
  };

  return (
    <div>
      <div style={{ width: '500px', height: '500px' }} ref={viewerElementRef} />
      <button onClick={handleRotateButtonClick}>Rotate 30</button>
    </div>
  );
}

/**
 * @description
 * - High Level API Example
 * - 외부에서 세부 API 를 노출시키지 않는 방식으로 사용성 개선 버전
 * - 이 경우, DicomViewer 내부에서 useDicomViewer 등을 활용하여 동작의 통일성을 보장
 */
export function DicomViewerHighLevelExample() {
  return (
    <DicomViewer
      imageIds={[
        'wadouri:https://static.lunit.io/insight/samples/cxr/Nodule.dcm',
      ]}
    />
  );
}
