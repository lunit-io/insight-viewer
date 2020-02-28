import { ContourDrawer, ContourViewer } from '@lunit/insight-viewer';
import { useAddAnnotationDialog } from 'ui-guideline/samples/annotation-cxr/components/dialogs/useAddAnnotationDialog';
import { AnnotationsPanelBase } from 'ui-guideline/samples/annotation-cxr/components/sidebar/AnnotationsPanel';
import { lesionColors } from 'ui-guideline/samples/annotation-cxr/env';
import {
  AIAnnotation,
  Annotation,
  AnnotationInfo,
  AnnotatorAnnotation,
} from 'ui-guideline/samples/annotation-cxr/model/case';
import { Lesion } from 'ui-guideline/samples/annotation-cxr/model/lesion';
import { color as d3color } from 'd3-color';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { AnnotationExample } from '../../../components/examples/AnnotationExample';

const lesions: Lesion[] = [
  { id: 'atelectasis', label: 'Atelectasis' },
  { id: 'calcified_nodule', label: 'Calcified Nodule' },
  { id: 'cardiomegaly', label: 'Cardiomegaly' },
  { id: 'consolidation', label: 'Consolidation' },
  { id: 'fibrosis', label: 'Fibrosis' },
  { id: 'mediastinal_widening', label: 'Mediastinal Widening' },
  { id: 'nodule', label: 'Nodule' },
  { id: 'pleural_effusion', label: 'Pleural Effusion' },
  { id: 'pneumoperitoneum', label: 'Pneumoperitoneum' },
  { id: 'pneumothorax', label: 'Pneumothorax' },
];

function labelFunction({ id, lesion }: Annotation | AIAnnotation | AnnotatorAnnotation): string {
  return `${id} (${lesion?.label || '-'})`;
}

export function CXRAnnotationExample({ width, height }: { width: number; height: number }) {
  const [openAddAnnotationDialog, addAnnotationDialogElement] = useAddAnnotationDialog();
  const [hideUserContours, setHideUserContours] = useState<boolean>(false);

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
              {!hideUserContours && contours && contours.length > 0 && cornerstoneRenderData && (
                <Viewer
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
                    const contour = addContour(polygon, { lesion: null });

                    if (!contour) return;

                    const result: AnnotationInfo | null = await openAddAnnotationDialog({ lesions });

                    if (result?.lesion) {
                      updateContour(contour, {
                        ...result,
                        label: labelFunction,
                        dataAttrs: {
                          'data-lesion': result.lesion.id,
                        },
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
              <AnnotationsPanelBase
                lesions={lesions}
                hideUserContours={hideUserContours}
                updateHideUserContours={setHideUserContours}
                contours={contours}
                status={{ caseDeclare: 'none' }}
                focusedContour={focusedContour}
                onFocus={focusContour}
                onRemove={removeContour}
                onUpdate={updateContour}
                disabled={false}
              />
            </>
          ),
        };
      }}
    </AnnotationExample>
  );
}

const contourStyle = (lesion: string, color: string) => css`
  [data-lesion="${lesion}"] {
    --contour-viewer-color: ${color};
    --contour-viewer-focused-color: ${d3color(color)
      ?.brighter(3)
      .toString() || color};
    --contour-viewer-fill-color: ${color};
  }
`;

const contourColors = css`
  polygon {
    fill-opacity: 0.2;
  }

  ${Object.keys(lesionColors).map((lesion: string) => contourStyle(lesion, lesionColors[lesion]))}
`;

const Viewer = styled(ContourViewer)`
  ${contourColors}
`;
