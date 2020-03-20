import {
  CircleViewer,
  CircleHover,
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  InsightViewerControllerOptions,
  InsightViewerTestController,
  installWADOImageLoader,
  unloadImage,
  useContour,
  useInsightViewerSync,
} from '@lunit/insight-viewer';
import React, { useMemo, useState } from 'react';
import { initialContours } from '../../../__fixtures__/circle';

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

  const { cornerstoneRenderData, updateCornerstoneRenderData } = useInsightViewerSync();

  // create contour data
  const { contours, focusedContour, focusContour } = useContour({
    mode: 'circle',
    initialContours,
  });

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
            updateCornerstoneRenderData={updateCornerstoneRenderData}
          />
          {contours && contours.length > 0 && cornerstoneRenderData && (
            <>
              <CircleViewer
                width={width}
                height={height}
                contours={contours}
                focusedContour={focusedContour}
                cornerstoneRenderData={cornerstoneRenderData}
              />
              <CircleHover
                hover
                width={width}
                height={height}
                contours={contours}
                onFocus={focusContour}
                cornerstoneRenderData={cornerstoneRenderData}
              />
            </>
          )}
        </InsightViewerContainer>
      )}
    </InsightViewerTestController>
  );
};
