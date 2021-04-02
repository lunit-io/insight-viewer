import {
  CornerstoneImage,
  CornerstoneSingleImage,
  CornerstoneViewer,
  InsightViewerContainer,
  InsightViewerControllerOptions,
  InsightViewerTestController,
  installWADOImageLoader,
  LeftBottomHolder,
  LeftTopHolder,
  RightBottomHolder,
  RightTopHolder,
  StrokeText,
  unloadImage,
} from '@lunit/insight-viewer';
import React, { useMemo } from 'react';

installWADOImageLoader();

const controllerOptions: InsightViewerControllerOptions = {
  width: [600, 400, 1000],
  height: [700, 400, 1000],
  control: ['pan', ['none', 'pan', 'adjust']],
  wheel: ['zoom', ['none', 'zoom']],
  flip: [false],
  invert: [false],
};

export default () => {
  const image: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000010.dcm`, {
        unload: unloadImage,
      }),
    [],
  );

  return (
    <InsightViewerTestController options={controllerOptions}>
      {({ width, height, invert, flip, control, wheel, resetTime, element, setElement, interactions }) => (
        <InsightViewerContainer ref={setElement} width={width} height={height}>
          <CornerstoneViewer
            width={width}
            height={height}
            invert={invert}
            flip={flip}
            interactions={interactions}
            resetTime={resetTime}
            image={image}
            updateCornerstoneRenderData={() => {}}
          />

          <LeftTopHolder>
            <StrokeText>
              <text>
                <tspan fill="#ffffff">LEFT</tspan>
                &nbsp; &nbsp;
                <tspan fill="#8694B1">/</tspan>
                &nbsp; &nbsp;
                <tspan fill="#ffffff">TOP</tspan>
              </text>
            </StrokeText>
          </LeftTopHolder>

          <RightTopHolder>
            <StrokeText>
              <text>
                <tspan fill="#ffffff">RIGHT</tspan>
                &nbsp; &nbsp;
                <tspan fill="#8694B1">/</tspan>
                &nbsp; &nbsp;
                <tspan fill="#ffffff">TOP</tspan>
              </text>
            </StrokeText>
          </RightTopHolder>

          <LeftBottomHolder>
            <StrokeText>
              <text>
                <tspan fill="#ffffff">LEFT</tspan>
                &nbsp; &nbsp;
                <tspan fill="#8694B1">/</tspan>
                &nbsp; &nbsp;
                <tspan fill="#ffffff">BOTTOM</tspan>
              </text>
            </StrokeText>
          </LeftBottomHolder>

          <RightBottomHolder>
            <StrokeText>
              <text>
                <tspan fill="#ffffff">RIGHT</tspan>
                &nbsp; &nbsp;
                <tspan fill="#8694B1">/</tspan>
                &nbsp; &nbsp;
                <tspan fill="#ffffff">BOTTOM</tspan>
              </text>
            </StrokeText>
          </RightBottomHolder>
        </InsightViewerContainer>
      )}
    </InsightViewerTestController>
  );
};
