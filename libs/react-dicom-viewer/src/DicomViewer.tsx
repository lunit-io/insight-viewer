import { forwardRef } from 'react';

import { useDicomViewer } from './useDicomViewer';

interface HighLevelDicomViewerProps {
  imageIds?: string[];
}

interface LowLevelDicomViewerProps {
  viewerRef: React.RefObject<HTMLDivElement>;
}

type DicomViewerProps = HighLevelDicomViewerProps | LowLevelDicomViewerProps;

/**
 * @feedback
 * - High Level API 를 DicomViewer 로 변경
 * - Low Level API 는 div 를 외부에서 직접 사용하도록 example code 업데이트
 */
export const DicomViewer = forwardRef<HTMLDivElement, DicomViewerProps>(
  (props, ref) => {
    if ('imageIds' in props) {
      return <HighLevelDicomViewer {...props} />;
    }
    return <LowLevelDicomViewer ref={ref} />;
  }
);

const HighLevelDicomViewer = (props: HighLevelDicomViewerProps) => {
  const { viewerRef } = useDicomViewer({
    imageIds: props.imageIds ?? [],
  });

  return <LowLevelDicomViewer ref={viewerRef} />;
};

const LowLevelDicomViewer = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      id="dicom-viewer-wrapper"
      style={{ width: '100%', height: '100%' }}
    />
  );
});
