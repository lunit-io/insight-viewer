import { useCallback, useState } from 'react';

import { useStackViewport } from './useStackViewport';

import type {
  MappingToolWithKey,
  ViewerSnapshot,
} from '@lunit-insight-viewer/core';

export const useDicomViewer = ({
  imageIds,
  tools,
  onViewportChange,
  onImageChange,
}: {
  imageIds: string[];
  tools?: MappingToolWithKey[];
  onViewportChange?: (viewerInfo: ViewerSnapshot) => void;
  onImageChange?: (viewerInfo: ViewerSnapshot) => void;
}) => {
  const [viewerInfo, setViewerInfo] = useState<ViewerSnapshot | null>(null);
  const { dicomViewerWrapper, ref } = useDicomViewerElement();

  const handleCameraChange = useCallback((viewerInfo: ViewerSnapshot) => {
    onViewportChange?.(viewerInfo);
  }, []);

  const handleImageChange = useCallback((viewerInfo: ViewerSnapshot) => {
    onImageChange?.(viewerInfo);
  }, []);

  useStackViewport({
    tools,
    element: dicomViewerWrapper,
    imageIds,
    viewerInfo,
    onChange: setViewerInfo,
    onViewportChange: handleCameraChange,
    onImageChange: handleImageChange,
  });

  return {
    viewerRef: ref,
    viewerInfo,
    setViewerInfo,
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
