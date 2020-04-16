import {
  Contour,
  ContourDrawingState,
  CornerstoneImage,
  CornerstoneRenderData,
  CornerstoneSingleImage,
  CornerstoneViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  ProgressViewer,
  useContour,
  useInsightViewerSync,
  useViewerInteractions,
} from '@lunit/insight-viewer';
import { ViewportInfoLabel } from '@lunit/opt-components';
import { OPTControlState, useControl } from '@lunit/use-opt-control';
import { useResetTime } from '@lunit/use-reset-time';
import { useSnackbar } from '@ssen/snackbar';
import React, { ReactNode, useMemo, useState } from 'react';
import styled from 'styled-components';
import { sidebarWidth } from '../../env';
import { ControlPanel } from '../sidebar/ControlPanel';
import { SideBar } from '../sidebar/SideBar';

installWADOImageLoader();

interface ChildProps<T extends Contour> extends OPTControlState, ContourDrawingState<T> {
  cornerstoneRenderData: CornerstoneRenderData | null;
  viewerWidth: number;
  interactionElement: HTMLElement | null;
}

interface AnnotationExampleProps<T extends Contour> {
  width: number;
  height: number;
  children: (childProps: ChildProps<T>) => { viewer?: ReactNode; sidepanel?: ReactNode };
  contourMode: 'contour' | 'point' | 'circle';
  initialContours?: Omit<T, 'id'>[];
}

export function AnnotationExample<T extends Contour>({
  width,
  height,
  children,
  initialContours,
  contourMode,
}: AnnotationExampleProps<T>) {
  const image: CornerstoneImage = useMemo(
    () => new CornerstoneSingleImage(`wadouri:https://fixtures.front.lunit.io/dcm-files/series/CT000010.dcm`),
    [],
  );

  const { snackbarContainer } = useSnackbar();

  const { resetTime, updateResetTime } = useResetTime();

  const [interactionElement, setInteractionElement] = useState<HTMLElement | null>(null);

  const { cornerstoneRenderData, updateCornerstoneRenderData } = useInsightViewerSync();

  const { control, flip, invert, updateControl, resetControl, updateFlip, updateInvert } = useControl({
    initialControl: 'pen',
  });

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

  const viewerWidth: number = useMemo(() => {
    return width - sidebarWidth;
  }, [width]);

  const childProps = useMemo<ChildProps<T>>(
    () => ({
      cornerstoneRenderData,
      control,
      flip,
      invert,
      updateControl,
      resetControl,
      updateFlip,
      updateInvert,
      contours,
      focusedContour,
      addContour,
      removeContour,
      focusContour,
      addContours,
      removeAllContours,
      updateContour,
      viewerWidth,
      interactionElement,
      reset,
    }),
    [
      cornerstoneRenderData,
      control,
      flip,
      invert,
      updateControl,
      resetControl,
      updateFlip,
      updateInvert,
      contours,
      focusedContour,
      addContour,
      removeContour,
      focusContour,
      addContours,
      removeAllContours,
      updateContour,
      viewerWidth,
      interactionElement,
      reset,
    ],
  );

  const { viewer, sidepanel } = children(childProps);

  const interactions = useViewerInteractions([control, 'zoom'], { element: interactionElement });

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
          width: viewerWidth,
          height,
        }}
      >
        <InsightViewerContainer ref={setInteractionElement} width={viewerWidth} height={height}>
          <CornerstoneViewer
            width={viewerWidth}
            height={height}
            invert={invert}
            flip={flip}
            interactions={interactions}
            resetTime={resetTime}
            image={image}
            updateCornerstoneRenderData={updateCornerstoneRenderData}
          />
          {viewer}
          <ProgressViewer image={image} width={viewerWidth} height={height} />
        </InsightViewerContainer>

        <RightBottomHolder>
          <ViewportInfoLabel cornerstoneRenderData={cornerstoneRenderData} />
        </RightBottomHolder>

        <SnackbarContainer ref={snackbarContainer} />
      </div>

      <SideBar sessionId={resetTime.toString()} width={sidebarWidth}>
        <ControlPanel
          disabled={false}
          control={control}
          flip={flip}
          invert={invert}
          availablePen
          onControlChanged={updateControl}
          onFlipChanged={updateFlip}
          onInvertChanged={updateInvert}
          onResetControl={resetControl}
          onReset={updateResetTime}
        />
        {sidepanel}
      </SideBar>
    </div>
  );
}

const SnackbarContainer = styled.div`
  position: absolute;
  right: 10px;
  bottom: 10px;
  display: flex;
  flex-direction: column-reverse;
  justify-content: right;
  align-items: flex-end;

  > * {
    margin-top: 10px;
  }
`;

const RightBottomHolder = styled.div`
  position: absolute;
  right: 5px;
  bottom: 5px;
`;
