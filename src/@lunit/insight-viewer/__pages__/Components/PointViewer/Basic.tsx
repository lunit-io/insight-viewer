import {
  Contour,
  CornerstoneImage,
  CornerstoneSingleImage,
  CornerstoneViewer,
  InsightViewerContainer,
  InsightViewerControllerOptions,
  InsightViewerTestController,
  installWADOImageLoader,
  PointViewer,
  unloadImage,
  useContour,
  useInsightViewerSync,
} from '@lunit/insight-viewer';
import React, { useMemo } from 'react';

function labelFunction({ id }: Contour): string {
  return 'p' + id;
}

const initialContours: Omit<Contour, 'id'>[] = [
  {
    label: labelFunction,
    polygon: [[177.85263157894738, 148.04210526315788]],
  },
  {
    label: labelFunction,
    polygon: [[255.1017543859649, 217.20701754385965]],
  },
  {
    label: labelFunction,
    polygon: [[390.7368421052632, 118.39999999999999]],
  },
  {
    label: labelFunction,
    polygon: [[329.6561403508772, 391.4666666666667]],
  },
];

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

  // create contour data
  const {
    contours,
    focusedContour,
    addContour,
    removeContour,
    focusContour,
  } = useContour({
    mode: 'point',
    initialContours,
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
          {contours && cornerstoneRenderData && (
            <PointViewer
              width={width}
              height={height}
              contours={contours}
              interact={control === 'pen'}
              focusedContour={focusedContour}
              onFocus={focusContour}
              onAdd={(polygon) => addContour(polygon, { label: labelFunction })}
              onRemove={removeContour}
              cornerstoneRenderData={cornerstoneRenderData}
            />
          )}
        </InsightViewerContainer>
      )}
    </InsightViewerTestController>
  );
};
