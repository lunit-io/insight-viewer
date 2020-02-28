import { ContourDrawer, ContourViewer } from '@lunit/insight-viewer';
import { Annotation, AnnotationInfo } from 'ui-guideline/samples/opt-cxr/model/annotation';
import React from 'react';
import { AnnotationExample } from '../../../../components/examples/AnnotationExample';
import { useAddContourDialog } from './useAddContourDialog';
import { UserContoursPanel } from './UserContoursPanel';

export function OPTReaderTestAnnotationSliderExample({ width, height }: { width: number; height: number }) {
  const [openAddAnnotationDialog, addAnnotationDialogElement] = useAddContourDialog();

  return (
    <AnnotationExample<Annotation> width={width} height={height} contourMode="contour">
      {({
        contours,
        cornerstoneRenderData,
        viewerWidth,
        focusedContour,
        control,
        focusContour,
        addContour,
        updateContour,
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
                  onAdd={async polygon => {
                    const contour = addContour(polygon, { confidenceLevel: 0 });

                    if (!contour) return;

                    const result: AnnotationInfo | null = await openAddAnnotationDialog({});

                    if (result?.confidenceLevel) {
                      updateContour(contour, {
                        ...result,
                      });
                    } else {
                      removeContour(contour);
                    }
                  }}
                  onRemove={removeContour}
                  cornerstoneRenderData={cornerstoneRenderData}
                />
              )}
              {addAnnotationDialogElement}
            </>
          ),
          sidepanel: (
            <>
              <UserContoursPanel
                onFocus={focusContour}
                focusedContour={focusedContour}
                onUpdate={updateContour}
                onRemove={removeContour}
                disabled={false}
                contours={contours}
              />
            </>
          ),
        };
      }}
    </AnnotationExample>
  );
}
