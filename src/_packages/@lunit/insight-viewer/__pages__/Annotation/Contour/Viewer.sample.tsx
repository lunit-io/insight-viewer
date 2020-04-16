import {
  ContourDrawer,
  ContourViewer,
  CornerstoneImage,
  CornerstoneSingleImage,
  CornerstoneViewer,
  InsightViewerContainer,
  InsightViewerControllerOptions,
  InsightViewerTestController,
  installWADOImageLoader,
  unloadImage,
  useContour,
  useInsightViewerSync,
} from '@lunit/insight-viewer';
import { labelFunction } from '@lunit/insight-viewer/__fixtures__/contour';
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

const controllerOptionsWithPen: InsightViewerControllerOptions = {
  ...controllerOptions,
  control: ['pen', ['none', 'pan', 'pen', 'adjust']],
};

export default () => {
  const image: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://fixtures.front.lunit.io/dcm-files/series/CT000010.dcm`, {
        unload: unloadImage,
      }),
    [],
  );

  const { cornerstoneRenderData, updateCornerstoneRenderData } = useInsightViewerSync();

  // create contour data and user drawing behaviors
  const { contours, focusedContour, addContour, removeContour, focusContour } = useContour();

  return (
    <InsightViewerTestController options={controllerOptionsWithPen}>
      {({ width, height, invert, flip, control, element, setElement, interactions, resetTime }) => (
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
            <ContourViewer
              width={width}
              height={height}
              contours={contours}
              focusedContour={focusedContour}
              cornerstoneRenderData={cornerstoneRenderData}
            />
          )}
          {/* user contour drawing */}
          {contours && cornerstoneRenderData && control === 'pen' && (
            <ContourDrawer
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
