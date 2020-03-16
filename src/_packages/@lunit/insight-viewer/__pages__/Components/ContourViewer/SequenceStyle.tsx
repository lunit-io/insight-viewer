import {
  ContourViewer,
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
import { color as d3color } from 'd3-color';
import React, { useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import { initialContours, seriesColors } from '../../../__fixtures__/contour';

installWADOImageLoader();

const controllerOptions: InsightViewerControllerOptions = {
  width: [600, 400, 1000],
  height: [700, 400, 1000],
  control: ['pan', ['none', 'pan', 'adjust']],
  wheel: ['zoom', ['none', 'zoom']],
  flip: [false],
  invert: [false],
};

const sequenceStyle = (color: string, i: number) => {
  const focusedColor =
    d3color(color)
      ?.brighter(3)
      .toString() || color;

  return css`
    > [data-id="${i}"] {
      --contour-viewer-color: ${color};
      --contour-viewer-focused-color: ${focusedColor};
      --contour-viewer-fill-color: ${color};
    }
  `;
};

const SequenceStyleViewer = styled(ContourViewer)`
  polygon {
    fill-opacity: 0.2;
  }

  ${seriesColors.map(sequenceStyle)};
`;

export default () => {
  const image: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000010.dcm`, {
        unload: unloadImage,
      }),
    [],
  );

  const [divElement, setDivElement] = useState<HTMLDivElement | null>(null);

  const { cornerstoneRenderData, updateCornerstoneRenderData } = useInsightViewerSync();

  // create contour data
  const { contours, focusedContour } = useContour({
    mode: 'contour', // is [x, y][]
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
            <SequenceStyleViewer
              width={width}
              height={height}
              contours={contours}
              focusedContour={focusedContour}
              cornerstoneRenderData={cornerstoneRenderData}
            />
          )}
        </InsightViewerContainer>
      )}
    </InsightViewerTestController>
  );
};
