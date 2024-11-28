import { useCallback, useState } from 'react';
import { useStackViewport } from './useStackViewport';

import type { ViewerSnapshot } from '@lunit-insight-viewer/core';

export const useDicomViewer = ({ imageIds }: { imageIds: string[] }) => {
  const [viewerInfo, setViewerInfo] = useState<ViewerSnapshot | null>(null);
  const { dicomViewerWrapper, ref } = useDicomViewerElement();

  useStackViewport({
    element: dicomViewerWrapper,
    imageIds,
    viewerInfo,
    onChange: setViewerInfo,
  });

  return {
    viewerRef: ref,
    viewerInfo,
  };
};

const useDicomViewerElement = () => {
  const [dicomViewerWrapper, setDicomViewerWrapper] =
    useState<HTMLDivElement | null>(null);

  /**
   * for rendering trigger when update wrapper element
   * react callback ref docs: https://legacy.reactjs.org/docs/refs-and-the-dom.html#callback-refs
   */
  const ref = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setDicomViewerWrapper(node);
    }
  }, []);

  return {
    dicomViewerWrapper,
    ref,
  };
};
