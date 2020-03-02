import {
  Contour,
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  InsightViewerControllerOptions,
  InsightViewerTestController,
  installWADOImageLoader,
  PointViewer,
  unloadWADOImage,
  useContour,
  useInsightViewerSync,
  withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import React, { useMemo, useState } from 'react';

function labelFunction({ id }: Contour): string {
  return 'p' + id;
}

const initialContours: Omit<Contour, 'id'>[] = [
  {
    label: labelFunction,
    polygon: [[100, 200]],
  },
  {
    label: labelFunction,
    polygon: [[200, 200]],
  },
];

installWADOImageLoader();

export default {
  title: 'insight-viewer/Annotation/Point',
  decorators: [withInsightViewerStorybookGlobalStyle, withOPTComponentsStorybookGlobalStyle],
};

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

export const Viewer = () => {
  const image: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000010.dcm`, {
        unload: unloadWADOImage,
      }),
    [],
  );

  const [divElement, setDivElement] = useState<HTMLDivElement | null>(null);

  const { cornerstoneRenderData, updateCornerstoneRenderData } = useInsightViewerSync();

  // create contour data
  const { contours, focusedContour, addContour, removeContour, focusContour } = useContour({
    mode: 'point',
    initialContours,
  });

  return (
    <InsightViewerTestController options={controllerOptionsWithPen}>
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
          {/* print contours */}
          {contours && cornerstoneRenderData && (
            <PointViewer
              width={width}
              height={height}
              contours={contours}
              interact={control === 'pen'}
              focusedContour={focusedContour}
              onFocus={focusContour}
              onAdd={polygon => addContour(polygon, { label: labelFunction })}
              onRemove={removeContour}
              cornerstoneRenderData={cornerstoneRenderData}
            />
          )}
        </InsightViewerContainer>
      )}
    </InsightViewerTestController>
  );
};
