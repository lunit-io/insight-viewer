import {
  Contour,
  ContourDrawingState,
  CornerstoneImage,
  CornerstoneRenderData,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  ProgressViewer,
  useContour,
  useInsightViewerSync,
} from '@lunit/insight-viewer';
import { ViewportInfoLabel } from '@lunit/opt-components';
import React, { ReactNode, useMemo, useState } from 'react';
import styled from 'styled-components';

installWADOImageLoader();

interface ChildProps<T extends Contour> extends ContourDrawingState<T> {
  cornerstoneRenderData: CornerstoneRenderData | null;
  interactionElement: HTMLElement | null;
}

interface AnnotationExampleProps<T extends Contour> {
  width: number;
  height: number;
  children: (childProps: ChildProps<T>) => ReactNode;
  contourMode: 'contour' | 'point' | 'circle';
  initialContours: Omit<T, 'id'>[];
}

export function LiveAnnotationExample<T extends Contour>({
  width,
  height,
  children,
  contourMode,
  initialContours,
}: AnnotationExampleProps<T>) {
  const image: CornerstoneImage = useMemo(
    () => new CornerstoneSingleImage(`wadouri:https://fixtures.front.lunit.io/dcm-files/series/CT000010.dcm`),
    [],
  );
  const resetTime = useMemo(() => Date.now(), []);

  const [interactionElement, setInteractionElement] = useState<HTMLElement | null>(null);

  const { cornerstoneRenderData, updateCornerstoneRenderData } = useInsightViewerSync();

  const {
    contours,
    focusedContour,
    addContour,
    removeContour,
    focusContour,
    addContours,
    removeAllContours,
    updateContour,
    reset,
  } = useContour({
    initialContours,
    mode: contourMode,
  });

  const childProps = useMemo<ChildProps<T>>(
    () => ({
      cornerstoneRenderData,
      contours,
      focusedContour,
      addContour,
      removeContour,
      focusContour,
      addContours,
      removeAllContours,
      updateContour,
      interactionElement,
      reset,
    }),
    [
      cornerstoneRenderData,
      contours,
      focusedContour,
      addContour,
      removeContour,
      focusContour,
      addContours,
      removeAllContours,
      updateContour,
      interactionElement,
      reset,
    ],
  );

  return (
    <div
      style={{
        display: 'flex',
        width,
        height,
      }}
    >
      <div
        style={{
          position: 'relative',
          width,
          height,
        }}
      >
        <InsightViewerContainer ref={setInteractionElement} width={width} height={height}>
          <InsightViewer
            width={width}
            height={height}
            invert={false}
            flip={false}
            pan={interactionElement}
            adjust={false}
            zoom={interactionElement}
            resetTime={resetTime}
            image={image}
            updateCornerstoneRenderData={updateCornerstoneRenderData}
          />
          {children(childProps)}
          <ProgressViewer image={image} width={width} height={height} />
        </InsightViewerContainer>

        <RightBottomHolder>
          <ViewportInfoLabel cornerstoneRenderData={cornerstoneRenderData} />
        </RightBottomHolder>
      </div>
    </div>
  );
}

const RightBottomHolder = styled.div`
  position: absolute;
  right: 5px;
  bottom: 5px;
`;
