import React, { useEffect, useRef } from 'react';
import { CornerstoneImage } from '../image/types';

export interface DCMImageProps {
  cornerstoneImage: CornerstoneImage;
  width: number;
  height: number;
}

export function DCMImage({ cornerstoneImage, width, height }: DCMImageProps) {
  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const subscription = cornerstoneImage.image.subscribe(image => {
      if (!element.current) return;

      cornerstone.disable(element.current);
      cornerstone.enable(element.current);

      if (image) {
        const defaultViewport = cornerstone.getDefaultViewportForImage(element.current, image);
        cornerstone.displayImage(element.current, image, defaultViewport);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [cornerstoneImage]);

  return (
    <div
      ref={element}
      style={{
        width,
        height,
      }}
    />
  );
}
