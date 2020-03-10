import {
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  InsightViewerControllerOptions,
  InsightViewerTestController,
  installWADOImageLoader,
  unloadImage,
  LeftTopHolder,
  RightTopHolder,
  LeftBottomHolder,
  RightBottomHolder,
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
      new CornerstoneSingleImage(`wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000010.dcm`, {
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
