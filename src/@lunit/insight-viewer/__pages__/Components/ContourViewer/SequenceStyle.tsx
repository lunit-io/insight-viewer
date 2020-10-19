import {
  ContourHover,
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
import { color as d3color } from 'd3-color';
import React, { useMemo } from 'react';
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
  const focusedColor = d3color(color)?.brighter(3).toString() || color;

  return css`
    > [data-id='${i}'] {
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
      new CornerstoneSingleImage(`wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000010.dcm`, {
        unload: unloadImage,
      }),
    [],
  );

  const { cornerstoneRenderData, updateCornerstoneRenderData } = useInsightViewerSync();

  // create contour data
  const { contours, focusedContour, focusContour } = useContour({
    mode: 'contour', // is [x, y][]
    initialContours,
  });

  return (
    <InsightViewerTestController options={controllerOptions}>
      {({ width, height, invert, flip, control, wheel, resetTime, setElement, element, interactions }) => (
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
            <>
              <SequenceStyleViewer
                width={width}
                height={height}
                contours={contours}
                focusedContour={focusedContour}
                cornerstoneRenderData={cornerstoneRenderData}
              />
              <ContourHover
                hover={element}
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
