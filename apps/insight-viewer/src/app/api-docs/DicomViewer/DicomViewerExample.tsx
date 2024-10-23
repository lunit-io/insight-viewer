import { useDicomViewer } from './hooks';
import { DicomViewer } from './DicomViewer';

/**
 * @description
 * - Low Level API Example 1
 * - useDicomViewer 를 사용하여 image, viewport 객체를
 * - 외부로 노출시키는 방식으로 외부에서 충분히 핸들링 할 수 있도록 하기 위함
 */
export function DicomViewerLowLevelExample1() {
  const { viewerRef, image, viewport, setImage, setViewport } = useDicomViewer({
    imageIds: [
      'wadouri:https://static.lunit.io/insight/samples/cxr/Nodule.dcm',
    ],
    onImageChange: (currentImage) => {
      console.log('currentImage', currentImage);
      return currentImage;
    },
    onViewportChange: (currentViewport) => {
      console.log('currentViewport', currentViewport);
      return currentViewport;
    },
  });

  return (
    <DicomViewer
      ref={viewerRef}
      image={image}
      viewport={viewport}
      setImage={setImage}
      setViewport={setViewport}
    />
  );
}

/**
 * @description
 * - Low Level API Example 2
 * - Spread Operator 를 통해 props 를 전달할 수 있습니다.
 */
export function DicomViewerLowLevelExample2() {
  const dicomViewerInfo = useDicomViewer({
    imageIds: [
      'wadouri:https://static.lunit.io/insight/samples/cxr/Nodule.dcm',
    ],
  });

  return <DicomViewer {...dicomViewerInfo} />;
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
