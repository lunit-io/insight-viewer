import { ContourDrawer, ContourViewer } from '@lunit/insight-viewer';
import React from 'react';
import { AnnotationExample } from '../../../components/examples/AnnotationExample';

export function PolygonAnnotationExample({ width, height }: { width: number; height: number }) {
  return (
    <AnnotationExample width={width} height={height} contourMode="contour">
      {({
        contours,
        cornerstoneRenderData,
        viewerWidth,
        focusedContour,
        control,
        focusContour,
        addContour,
        removeContour,
        interactionElement,
      }) => {
        return {
          viewer: (
            <>
              {contours && contours.length > 0 && cornerstoneRenderData && (
                <ContourViewer
                  width={viewerWidth}
                  height={height}
                  contours={contours}
                  focusedContour={focusedContour}
                  cornerstoneRenderData={cornerstoneRenderData}
                />
              )}
              {contours && cornerstoneRenderData && control === 'pen' && (
                <ContourDrawer
                  width={viewerWidth}
                  height={height}
                  contours={contours}
                  draw={control === 'pen' && interactionElement}
                  onFocus={focusContour}
                  onAdd={(contour) => addContour(contour)}
                  onRemove={removeContour}
                  cornerstoneRenderData={cornerstoneRenderData}
                />
              )}
            </>
          ),
        };
      }}
    </AnnotationExample>
  );
}
