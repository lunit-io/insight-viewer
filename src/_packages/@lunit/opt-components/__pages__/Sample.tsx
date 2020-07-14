import {
  CornerstoneImage,
  CornerstoneSingleImage,
  CornerstoneViewer,
  InsightViewerControllerOptions,
  InsightViewerTestController,
  installWADOImageLoader,
  unloadImage,
  InsightViewerContainer,
  useInsightViewerSync,
  useViewerInteractions,
} from '@lunit/insight-viewer';
import React, { useMemo, useState } from 'react';
import { QuarterView } from '../components/QuarterView';
import styled from 'styled-components';
import useResizeObserver from 'use-resize-observer';

installWADOImageLoader();

const _width: number = 400;
const _height: number = 400;

export default () => {
  const image1: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(
        `wadouri:https://static.lunit.io/insight/samples/mmg/2.2.1-5.5.0-density/case01_RCC.dcm`,
        {
          unload: unloadImage,
        },
      ),
    [],
  );
  const image2: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(
        `wadouri:https://static.lunit.io/insight/samples/mmg/2.2.1-5.5.0-density/case01_LCC.dcm`,
        {
          unload: unloadImage,
        },
      ),
    [],
  );
  const image3: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(
        `wadouri:https://static.lunit.io/insight/samples/mmg/2.2.1-5.5.0-density/case01_RMLO.dcm`,
        {
          unload: unloadImage,
        },
      ),
    [],
  );
  const image4: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(
        `wadouri:https://static.lunit.io/insight/samples/mmg/2.2.1-5.5.0-density/case01_LMLO.dcm`,
        {
          unload: unloadImage,
        },
      ),
    [],
  );

  return (
    <div>
      <QuarterViewContainer>
        <Viewer image={image1} />
        <Viewer image={image2} />
        <Viewer image={image3} />
        <Viewer image={image4} />
      </QuarterViewContainer>
    </div>
  );
};

function Viewer({ image }: { image: CornerstoneImage }) {
  const [interactionElement, setInteractionElement] = useState<HTMLElement | null>(null);
  const interactions = useViewerInteractions(['none', 'zoom'], { element: interactionElement });
  const { ref: resizeRef, width = 200, height = 300 } = useResizeObserver<HTMLDivElement>({});

  return (
    <div
      ref={resizeRef}
      style={{
        overflow: 'hidden',
        position: 'relative',
        height: '100%',
        minHeight: 0,
      }}
    >
      <InsightViewerContainer ref={setInteractionElement} width={width} height={height}>
        <CornerstoneViewer
          width={width}
          height={height}
          invert={false}
          flip={false}
          resetTime={0}
          image={image}
          // ref={viewerRef as RefObject<CornerstoneViewer>}
          updateCornerstoneRenderData={() => {}}
          interactions={interactions}
        />
      </InsightViewerContainer>
    </div>
  );
}

const QuarterViewContainer = styled(QuarterView)`
  width: 100%;
  overflow: hidden;
  position: relative;
`;
