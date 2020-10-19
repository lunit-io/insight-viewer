import {
  CornerstoneImage,
  CornerstoneSingleImage,
  CornerstoneViewer,
  InsightViewerContainer,
  InsightViewerControllerOptions,
  InsightViewerTestController,
  installWADOImageLoader,
  LineDrawer,
  LineViewer,
  unloadImage,
  useContour,
  useInsightViewerSync,
} from '@lunit/insight-viewer';
import React, { useMemo } from 'react';
import { labelFunction } from '../../../__fixtures__/line';

installWADOImageLoader();

const controllerOptions: InsightViewerControllerOptions = {
  width: [600, 400, 1000],
  height: [700, 400, 1000],
  control: ['pen', ['none', 'pan', 'pen', 'adjust']],
  wheel: ['zoom', ['none', 'zoom']],
  flip: [false],
  invert: [false],
};

export default () => {
  const image: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(
        `wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000010.dcm`,
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

  // create contour data and user drawing behaviors
  const {
    contours,
    focusedContour,
    addContour,
    removeContour,
    focusContour,
  } = useContour({
    mode: 'line',
  });

  return (
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
        <InsightViewerContainer ref={setElement} width={width} height={height}>
          <CornerstoneViewer
            width={width}
            height={height}
            invert={invert}
            flip={flip}
            interactions={interactions}
            resetTime={resetTime}
            image={image}
            updateCornerstoneRenderData={updateCornerstoneRenderData}
          />
          {contours && contours.length > 0 && cornerstoneRenderData && (
            <LineViewer
              width={width}
              height={height}
              contours={contours}
              focusedContour={focusedContour}
              cornerstoneRenderData={cornerstoneRenderData}
            />
          )}
          {contours && cornerstoneRenderData && control === 'pen' && (
            <LineDrawer
              width={width}
              height={height}
              contours={contours}
              draw={control === 'pen' && element}
              onFocus={focusContour}
              onAdd={(contour) => addContour(contour, { label: labelFunction })}
              onRemove={removeContour}
              cornerstoneRenderData={cornerstoneRenderData}
            />
          )}
        </InsightViewerContainer>
      )}
    </InsightViewerTestController>
  );
};
