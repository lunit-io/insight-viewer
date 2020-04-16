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
import { categoryColors, initialContours } from '../../../__fixtures__/contour';

installWADOImageLoader();

const controllerOptions: InsightViewerControllerOptions = {
  width: [600, 400, 1000],
  height: [700, 400, 1000],
  control: ['pan', ['none', 'pan', 'adjust']],
  wheel: ['zoom', ['none', 'zoom']],
  flip: [false],
  invert: [false],
};

const categoryStyle = (category: string) => {
  // focused color는 기본 color를 조금 밝게해서 사용한다
  const focusedColor = d3color(categoryColors[category])?.brighter(3).toString() || categoryColors[category];

  // data-category attribute 별로 색상을 지정해준다
  return css`
    > [data-category="${category}"] {
      --contour-viewer-color: ${categoryColors[category]};
      --contour-viewer-focused-color: ${focusedColor};
      --contour-viewer-fill-color: ${categoryColors[category]};
    }
  `;
};

const CategoryStyleViewer = styled(ContourViewer)`
  polygon {
    fill-opacity: 0.3;
  }

  ${Object.keys(categoryColors).map(categoryStyle)};
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

  // create contour data
  const { contours, focusedContour, focusContour } = useContour({
    mode: 'contour', // is [x, y][]
    initialContours,
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
            <>
              <CategoryStyleViewer
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
