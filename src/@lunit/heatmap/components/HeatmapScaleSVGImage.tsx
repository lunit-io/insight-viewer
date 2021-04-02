import React, { SVGProps } from 'react';
import { useHeatmapScaleImageURI } from '../hooks/useHeatmapScaleImageURI';

export interface HeatmapScaleImageProps extends SVGProps<SVGImageElement> {
  threshold?: number;
  width: number;
  height: number;
}

/**
 * `width x height` 형태의 Rectangle SVG <image/>. <svg> 내에서 사용할 수 있다.
 */
export function HeatmapScaleSVGImage({ threshold = 0, width, height, ...imageProps }: HeatmapScaleImageProps) {
  const dataUri: string | null = useHeatmapScaleImageURI({
    width,
    height,
    threshold,
  });

  return dataUri ? <image {...imageProps} xlinkHref={dataUri} width={width} height={height} /> : null;
}
