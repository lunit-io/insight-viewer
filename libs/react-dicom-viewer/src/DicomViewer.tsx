import { useState, useCallback } from 'react';

import { useStackViewport } from './useStackViewport';

import type {
  ViewerSnapshot,
  MappingToolWithKey,
} from '@lunit-insight-viewer/core';

interface DicomViewerProps {
  imageIds: string[];
  tools?: MappingToolWithKey[];
  viewerInfo?: ViewerSnapshot;
  onChange?: (viewerInfo: ViewerSnapshot) => void;
}

export function DicomViewer({
  imageIds,
  tools,
  viewerInfo,
  onChange,
}: DicomViewerProps) {
  const { dicomViewerWrapper, ref } = useDicomViewerElement();

  useStackViewport({
    element: dicomViewerWrapper,
    imageIds,
    tools,
    viewerInfo,
    onChange,
  });

  return (
    <div
      ref={ref}
      id="dicom-viewer-wrapper"
      style={{ width: '100%', height: '100%' }}
    />
  );
}

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
