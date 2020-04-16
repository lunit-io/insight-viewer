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
      new CornerstoneSingleImage(`wadouri:https://fixtures.front.lunit.io/dcm-files/series/CT000010.dcm`, {
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
            <span style={{ color: 'red', fontSize: 13 }}>LEFT / TOP</span>
          </LeftTopHolder>

          <RightTopHolder>
            <span style={{ color: 'red', fontSize: 13 }}>RIGHT / TOP</span>
          </RightTopHolder>

          <LeftBottomHolder>
            <span style={{ color: 'red', fontSize: 13 }}>LEFT / BOTTOM</span>
          </LeftBottomHolder>

          <RightBottomHolder>
            <span style={{ color: 'red', fontSize: 13 }}>RIGHT / BOTTOM</span>
          </RightBottomHolder>
        </InsightViewerContainer>
      )}
    </InsightViewerTestController>
  );
};
