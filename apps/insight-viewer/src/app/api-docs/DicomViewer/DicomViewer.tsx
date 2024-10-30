import { forwardRef, useEffect } from 'react';
import { useDicomViewer } from './hooks';

import type { Image, StackViewport } from '@lunit-insight-viewer/core';

interface HighLevelDicomViewerProps {
  imageIds: string[];
}

interface LowLevelDicomViewerProps {
  image: Image | null;
  viewport: StackViewport | null;
  setImage: (image: Image | null) => void;
  setViewport: (viewport: StackViewport | null) => void;
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
  const { imageIds } = props;

  const { viewerRef, image, viewport, setImage, setViewport } = useDicomViewer({
    imageIds,
  });

  return (
    <LowLevelDicomViewer
      ref={viewerRef}
      image={image}
      viewport={viewport}
      setImage={setImage}
      setViewport={setViewport}
    />
  );
};

const LowLevelDicomViewer = forwardRef<
  HTMLDivElement,
  LowLevelDicomViewerProps
>((props, ref) => {
  const { image, viewport, setImage, setViewport } = props;

  // init 세팅
  useEffect(() => {
    if (!ref) return;
    // setImage(image);
    // setViewport(viewport);
  }, [image, viewport, setImage, setViewport, ref]);

  // image 변경 시 cornerstone 에 적용
  useEffect(() => {
    if (!ref) return;
    // setImage(image);
  }, [image, setImage, ref]);

  // viewport 변경 시 cornerstone 에 적용
  useEffect(() => {
    if (!ref) return;
    // setViewport(viewport);
  }, [viewport, setViewport, ref]);

  return (
    <div
      ref={ref}
      id="dicom-viewer-wrapper"
      style={{ width: '100%', height: '100%' }}
    />
  );
});
