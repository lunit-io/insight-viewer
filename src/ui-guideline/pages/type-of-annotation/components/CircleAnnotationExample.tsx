import { CircleDrawer, CircleViewer } from '@lunit/insight-viewer';
import React from 'react';
import { AnnotationExample } from '../../../components/examples/AnnotationExample';

export function CircleAnnotationExample({ width, height }: { width: number; height: number }) {
  return (
    <AnnotationExample width={width} height={height} contourMode="circle">
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
                <CircleViewer
                  width={viewerWidth}
                  height={height}
                  contours={contours}
                  focusedContour={focusedContour}
                  cornerstoneRenderData={cornerstoneRenderData}
                />
              )}
              {contours && cornerstoneRenderData && control === 'pen' && (
                <CircleDrawer
                  width={viewerWidth}
                  height={height}
                  contours={contours}
                  draw={control === 'pen' && interactionElement}
                  onFocus={focusContour}
                  onAdd={contour => addContour(contour)}
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
