import {
  CircleDrawer,
  CircleViewer,
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
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { labelFunction } from '../../../__fixtures__/circle';

installWADOImageLoader();

const controllerOptions: InsightViewerControllerOptions = {
  width: [600, 400, 1000],
  height: [700, 400, 1000],
  control: ['pen', ['none', 'pan', 'pen', 'adjust']],
  wheel: ['zoom', ['none', 'zoom']],
  flip: [false],
  invert: [false],
};

const CustomStyleDrawer = styled(CircleDrawer)`
  --contour-drawer-color: #ff0000;
  --contour-drawer-fill-color: rgba(255, 255, 255, 0.4);
  --contour-drawer-stroke-width: 7px;
`;

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
  const { contours, focusedContour, addContour, removeContour, focusContour } = useContour({
    mode: 'circle',
  });

  return (
    <InsightViewerTestController options={controllerOptions}>
      {({ width, height, invert, flip, control, wheel, resetTime, interactions, setElement, element }) => (
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
            <CircleViewer
              width={width}
              height={height}
              contours={contours}
              focusedContour={focusedContour}
              cornerstoneRenderData={cornerstoneRenderData}
            />
          )}
          {contours && cornerstoneRenderData && control === 'pen' && element && (
            <CustomStyleDrawer
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
