import { useState, useCallback } from 'react';

import { useStackViewport } from './useStackViewport';

import type { MappingToolWithKey } from '@lunit-insight-viewer/core';

interface DicomViewerProps {
  imageIds: string[];
  tools?: MappingToolWithKey[];
}

export function DicomViewer({ imageIds, tools }: DicomViewerProps) {
  const { dicomViewerWrapper, ref } = useDicomViewerElement();

  useStackViewport({
    element: dicomViewerWrapper,
    imageIds,
    tools,
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
