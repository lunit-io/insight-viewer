import { ContourDrawer, ContourViewer } from '@lunit/insight-viewer';
import { useAddContourDialog } from 'ui-guideline/samples/opt-cxr/components/dialogs/useAddContourDialog';
import { UserContoursPanel } from 'ui-guideline/samples/opt-cxr/components/sidebar/UserContoursPanel';
import {
  Annotation,
  AnnotationInfo,
} from 'ui-guideline/samples/opt-cxr/model/annotation';
import React from 'react';
import { AnnotationExample } from '../../../components/examples/AnnotationExample';

export function OPTReaderTestAnnotationExample({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  const [
    openAddAnnotationDialog,
    addAnnotationDialogElement,
  ] = useAddContourDialog();

  return (
    <AnnotationExample<Annotation>
      width={width}
      height={height}
      contourMode="contour"
    >
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
                  onAdd={async (polygon) => {
                    const contour = addContour(polygon, { confidenceLevel: 0 });

                    if (!contour) return;

                    const result: AnnotationInfo | null = await openAddAnnotationDialog(
                      { mode: 'slider' },
                    );

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
                type="reader-test"
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
