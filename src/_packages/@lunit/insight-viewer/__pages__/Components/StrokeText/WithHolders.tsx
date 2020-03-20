import {
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
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
import React, { useMemo, useState } from 'react';

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
      new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000010.dcm`, {
        unload: unloadImage,
      }),
    [],
  );

  const [divElement, setDivElement] = useState<HTMLDivElement | null>(null);

  return (
    <InsightViewerTestController options={controllerOptions}>
      {({ width, height, invert, flip, control, wheel, resetTime }) => (
        <InsightViewerContainer ref={setDivElement} width={width} height={height}>
          <InsightViewer
            width={width}
            height={height}
            invert={invert}
            flip={flip}
            pan={control === 'pan' && divElement}
            adjust={control === 'adjust' && divElement}
            zoom={wheel === 'zoom' && divElement}
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
