import {
  CornerstoneImage,
  CornerstoneSingleImage,
  CornerstoneViewer,
  HeatmapViewer,
  InsightViewerContainer,
  InsightViewerControllerOptions,
  InsightViewerTestController,
  installWADOImageLoader,
  unloadImage,
  useInsightViewerSync,
} from '@lunit/insight-viewer';
import React, { useMemo } from 'react';
import data from '../../../__fixtures__/posMap.sample.json';

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
      new CornerstoneSingleImage(
        `wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000010.dcm`,
        {
          unload: unloadImage,
        },
      ),
    [],
  );

  const {
    cornerstoneRenderData,
    updateCornerstoneRenderData,
  } = useInsightViewerSync();

  return (
    <div>
      <InsightViewerTestController options={controllerOptions}>
        {({
          width,
          height,
          invert,
          flip,
          control,
          wheel,
          resetTime,
          element,
          setElement,
          interactions,
        }) => (
          <InsightViewerContainer
            ref={setElement}
            width={width}
            height={height}
          >
            <CornerstoneViewer
              width={width}
              height={height}
              invert={invert}
              flip={flip}
              interactions={interactions}
              resetTime={resetTime}
              image={image}
              updateCornerstoneRenderData={updateCornerstoneRenderData} // Render data를 받는다
            />
            {Array.isArray(data.engine_result.engine_result.pos_map) &&
              cornerstoneRenderData && (
                <HeatmapViewer
                  width={width}
                  height={height}
                  posMap={data.engine_result.engine_result.pos_map}
                  threshold={0.1}
                  cornerstoneRenderData={cornerstoneRenderData} // Render data를 전달한다
                />
              )}
          </InsightViewerContainer>
        )}
      </InsightViewerTestController>
    </div>
  );
};
