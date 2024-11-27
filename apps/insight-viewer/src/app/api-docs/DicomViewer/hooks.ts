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
  const { image } = useDicom(params);
  const { viewerRef, viewport } = useDicomViewport({ image });

  return {
    viewerRef,
    image,
    viewport,
  };
};

export const useDicom = (params: DicomViewerHooksParams) => {
  const [image, setImage] = useState<DicomViewerImage>(null);

  // TODO: 이미지 로드 로직 구현 필요
  useEffect(() => {
    //   const images = params.imageIds.map(getImage);
    //   setImage(images);
  }, [params]);

  return { image };
};

export const useDicomViewport = ({ image }: { image: DicomViewerImage }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [viewport] = useState<DicomViewerViewport>(null);

  // TODO: viewport 로직 구현 필요
  useEffect(() => {
    if (viewerRef.current) {
      //   const viewport = new StackViewport(viewerRef.current);
      //   setViewport(viewport);
    }
  }, [viewerRef, image]);

  return {
    viewerRef,
    viewport,
  };
};

/**
 * @description
 *
 * - useDicom 에서 초기 image 정보만을 획득
 * - useDicomViewport 에서 image 정보와 ref 를 토대로 viewport 정보를 획득
 */
