import { useRef } from 'react';
import {
  DicomViewer,
  useDicomViewer,
  useDicomImage,
  useDicomViewport,
} from '@lunit-insight-viewer/react';

/**
 * @description
 * - useDicomViewer = useDicomImage + useDicomViewport
 * - useDicomViewer Return Type <== DicomViewer Props Type
 *
 * @feedback - 24.10.24
 * - useRef 를 매번 사용하는 방식이 번거롭게 보여짐
 * - useRef 를 useDicomViewer Return value 에 추가하는 방향으로 개선 필요
 * - Low Level API 는 제공할 메리트가 없기에 외부에 노출시키지 않는 방향으로 개선 필요
 * - imageId 는 wadouri 라는 것을 인지할 수 있도록 string 수정 및 parameter, props 네이밍 수정 필요
 *
 * - viewerInfo 는 굳이 하나의 객체로 Return 할 필요는 없어보임
 * - 사용자가 항상 구조분해할당을 해야한다는 점에서 사용성이 떨어져보임
 * - image, viewport 를 따로 노출하는 방식으로 개선 필요
 * - 동시에 setViewerInfo 를 제공하는 것이 아니라, 각 상태의 set 함수를 제공하는 방식으로 개선 필요
 * - tanstack-query api 처럼 onImageChange, onViewportChange 과 같은 parameter 를 받는 방법도 좋음
 * - 각 이벤트 시점마다 콜백 함수를 설정할 수 있도록 API 를 제공하기 위함
 */

export function SingleFrameDicomViewer() {
  const viewerRef = useRef(null);
  const { viewerInfo, setViewerInfo } = useDicomViewer({
    viewerRef,
    imageId: '1.2.840.113619.2.33.37.1002.1002',
  });

  const { image, viewport } = viewerInfo;
  console.log(image, viewport);

  return (
    <DicomViewer
      ref={viewerRef}
      viewerInfo={viewerInfo}
      onChange={setViewerInfo}
    />
  );
}

export function MultiFrameDicomViewer() {
  const viewerRef = useRef(null);
  const { viewerInfo, setViewerInfo } = useDicomViewer({
    viewerRef,
    imageIds: [
      '1.2.840.113619.2.33.37.1002.1002',
      '1.2.840.113619.2.33.37.1002.1003',
    ],
    // optional
    initialFrameIndex: 1,
  });

  const { image, viewport } = viewerInfo;
  console.log(image, viewport);

  return (
    <DicomViewer
      ref={viewerRef}
      viewerInfo={viewerInfo}
      onChange={setViewerInfo}
    />
  );
}

/**
 * @description
 * - Low Level API
 * - useDicomImage, useDicomViewport 를 사용하여 image, viewport 객체를
 * - 외부로 노출시키는 방식으로 외부에서 충분히 핸들링 할 수 있도록 하기 위함
 *
 * - Low Level API 는 외부로 노출시키지 않음 (라이브러리 개발자만 사용)
 * - 외부로 노출시키는 메리트가 없음
 * - (High Level API 에서 하지 못하는 걸 제공해야하는데 그렇지 않음)
 */
export function LowLevelDicomViewer() {
  const viewerRef = useRef(null);

  const { image } = useDicomImage('1.2.840.113619.2.33.37.1002.1002');
  const { viewport } = useDicomViewport({
    image,
    viewerRef,
  });

  return <DicomViewer ref={viewerRef} viewerInfo={{ image, viewport }} />;
}

/**
 * @description
 * - High Level API
 * - 외부에서 세부 API 를 노출시키지 않는 방식으로 사용성 개선 버전
 * - 이 경우, DicomViewer 내부에서 useDicomViewer 등을 활용하여 동작의 통일성을 보장
 */
export function HighLevelDicomViewer() {
  return <DicomViewer imageIds={['1.2.840.113619.2.33.37.1002.1002']} />;
}
