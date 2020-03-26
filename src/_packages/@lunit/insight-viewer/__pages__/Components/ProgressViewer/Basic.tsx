import {
  CornerstoneSequenceImage,
  CornerstoneSeriesImage,
  InsightViewer,
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
        series.map(p => `wadouri:https://fixtures.front.lunit.io/dcm-files/series/${p}`),
        { unload: unloadImage },
      ),
    [],
  );

  return (
    <InsightViewerTestController options={controllerOptions}>
      {({ width, height, invert, flip, control, wheel, resetTime }) => (
        <InsightViewerContainer width={width} height={height}>
          <InsightViewer
            width={width}
            height={height}
            invert={invert}
            flip={flip}
            pan={control === 'pan'}
            adjust={control === 'adjust'}
            zoom={wheel === 'zoom'}
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
