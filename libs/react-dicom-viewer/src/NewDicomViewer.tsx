import { forwardRef } from 'react';

import { useDicomViewer } from './useDicomViewer';

interface HighLevelDicomViewerProps {
  imageIds?: string[];
}

interface LowLevelDicomViewerProps {
  viewerRef: React.RefObject<HTMLDivElement>;
}

type DicomViewerProps = HighLevelDicomViewerProps | LowLevelDicomViewerProps;

export const NewDicomViewer = forwardRef<HTMLDivElement, DicomViewerProps>(
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
