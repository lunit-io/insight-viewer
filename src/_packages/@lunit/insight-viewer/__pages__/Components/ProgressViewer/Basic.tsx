import {
  CornerstoneSequenceImage,
  CornerstoneSeriesImage,
  CornerstoneViewer,
  InsightViewerContainer,
  InsightViewerControllerOptions,
  InsightViewerTestController,
  installWADOImageLoader,
  ProgressViewer,
  unloadImage,
} from '@lunit/insight-viewer';
import React, { useMemo } from 'react';
import series from '../../../__fixtures__/series.json';

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
  const image: CornerstoneSequenceImage = useMemo(
    () =>
      new CornerstoneSeriesImage(
        series.map((p) => `wadouri:https://fixtures.front.lunit.io/dcm-files/series/${p}`),
        { unload: unloadImage },
      ),
    [],
  );

  return (
    <InsightViewerTestController options={controllerOptions}>
      {({ width, height, invert, flip, control, wheel, resetTime, interactions }) => (
        <InsightViewerContainer width={width} height={height}>
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
          <ProgressViewer width={width} height={height} image={image} />
        </InsightViewerContainer>
      )}
    </InsightViewerTestController>
  );
};
