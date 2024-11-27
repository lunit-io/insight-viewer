import { forwardRef } from 'react';
import { useDicomViewer } from './hooks';

import type { Image, StackViewport } from '@lunit-insight-viewer/core';

interface HighLevelDicomViewerProps {
  imageIds: string[];
}

interface LowLevelDicomViewerProps {
  image: Image | null;
  viewport: StackViewport | null;
}

type DicomViewerProps = HighLevelDicomViewerProps | LowLevelDicomViewerProps;

export const DicomViewer = forwardRef<HTMLDivElement, DicomViewerProps>(
  (props, ref) => {
    if ('imageIds' in props) {
      return <HighLevelDicomViewer {...props} />;
    }
    return <LowLevelDicomViewer {...props} ref={ref} />;
  }
);

const HighLevelDicomViewer = (props: HighLevelDicomViewerProps) => {
  const { viewerRef, image, viewport } = useDicomViewer({
    imageIds: props.imageIds,
  });

  return (
    <LowLevelDicomViewer ref={viewerRef} image={image} viewport={viewport} />
  );
};

const LowLevelDicomViewer = forwardRef<
  HTMLDivElement,
  LowLevelDicomViewerProps
>((_, ref) => {
  return (
    <div
      ref={ref}
      id="dicom-viewer-wrapper"
      style={{ width: '100%', height: '100%' }}
    />
  );
});
