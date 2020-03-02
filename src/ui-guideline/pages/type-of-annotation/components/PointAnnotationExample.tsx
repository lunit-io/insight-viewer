import { PointViewer } from '@lunit/insight-viewer';
import React from 'react';
import { AnnotationExample } from '../../../components/examples/AnnotationExample';

export function PointAnnotationExample({ width, height }: { width: number; height: number }) {
  return (
    <AnnotationExample width={width} height={height} contourMode="point">
      {({
        contours,
        cornerstoneRenderData,
        viewerWidth,
        focusedContour,
        control,
        focusContour,
        addContour,
        removeContour,
      }) => {
        return {
          viewer: (
            <>
              {contours && cornerstoneRenderData && (
                <PointViewer
                  width={viewerWidth}
                  height={height}
                  contours={contours}
                  interact={control === 'pen'}
                  focusedContour={focusedContour}
                  cornerstoneRenderData={cornerstoneRenderData}
                  onFocus={focusContour}
                  onAdd={contour => addContour(contour)}
                  onRemove={removeContour}
                />
              )}
            </>
          ),
        };
      }}
    </AnnotationExample>
  );
}
