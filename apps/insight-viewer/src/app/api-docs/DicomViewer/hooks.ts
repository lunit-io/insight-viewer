import { useRef, useState, useEffect } from 'react';

import type { ViewerSnapshot } from '@lunit-insight-viewer/core';

interface DicomViewerHooksParams {
  imageIds: string[];
  onImageChange?: (viewerInfo: ViewerSnapshot) => void;
  onViewportChange?: (viewerInfo: ViewerSnapshot) => void;
}

export const useDicomViewer = ({
  imageIds,
  onImageChange,
  onViewportChange,
}: DicomViewerHooksParams) => {
  const [viewerInfo, setViewerInfo] = useState<ViewerSnapshot | null>(null);
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 이미지 렌더링 로직 구현
  }, [imageIds, onImageChange, onViewportChange]);

  return {
    viewerRef,
    viewerInfo,
    setViewerInfo,
  };
};
