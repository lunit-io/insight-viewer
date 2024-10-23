import { useRef, useState, useEffect } from 'react';

import type { Image, StackViewport } from '@lunit-insight-viewer/core';

type DicomViewerImage = Image | null;
type DicomViewerViewport = StackViewport | null;

interface DicomViewerHooksParams {
  imageIds: string[];
  onImageChange?: (image: DicomViewerImage) => DicomViewerImage;
  onViewportChange?: (viewport: DicomViewerViewport) => DicomViewerViewport;
}

export const useDicomViewer = (params: DicomViewerHooksParams) => {
  const { image, setImage } = useDicom(params);
  const { viewerRef, viewport, setViewport } = useDicomViewport();

  return {
    viewerRef,
    image,
    viewport,
    setImage,
    setViewport,
  };
};

export const useDicom = (params: DicomViewerHooksParams) => {
  const [image, setImage] = useState<DicomViewerImage>(null);

  // TODO: 이미지 로드 로직 구현 필요
  useEffect(() => {
    //   const images = params.imageIds.map(getImage);
    //   setImage(images);
  }, [params]);

  return {
    image,
    setImage,
  };
};

export const useDicomViewport = () => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState<DicomViewerViewport>(null);

  // TODO: viewport 로직 구현 필요
  useEffect(() => {
    if (viewerRef.current) {
      //   const viewport = new StackViewport(viewerRef.current);
      //   setViewport(viewport);
    }
  }, [viewerRef]);

  return {
    viewerRef,
    viewport,
    setViewport,
  };
};
