import { useCallback, useState } from 'react';

import { useStackViewport } from './useStackViewport';

import type {
  MappingToolWithKey,
  ViewerSnapshot,
} from '@lunit-insight-viewer/core';

/**
 * @feedback
 * - viewerInfo 네이밍 변경 필요 (ex: viewerStatus)
 * - viewerRef 네이밍 변경 필요 (ex: viewerEl - DOM Element 임을 강조)
 */
export const useDicomViewer = ({
  imageIds,
  tools,
}: {
  imageIds: string[];
  tools?: MappingToolWithKey[];
}) => {
  const [viewerInfo, setViewerInfo] = useState<ViewerSnapshot | null>(null);
  const { dicomViewerWrapper, ref } = useDicomViewerElement();

  useStackViewport({
    tools,
    element: dicomViewerWrapper,
    imageIds,
    viewerInfo,
    onChange: setViewerInfo,
  });

  return {
    viewerElementRef: ref,
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
