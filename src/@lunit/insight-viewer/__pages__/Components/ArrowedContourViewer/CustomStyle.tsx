import {
  ArrowedContour,
  ArrowedContourViewer,
  Contour,
  ContourHover,
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

installWADOImageLoader();

export function labelFunction(contour: Contour): string {
  return `Annotation(${contour.id})`;
}

export const initialContours: Omit<ArrowedContour, 'id'>[] = [
  {
    arrowStart: [195, 250],
    arrowEnd: [255, 180],
    polygon: [
      [95.57333333333334, 251.73333333333335],
      [89.60000000000001, 255.14666666666665],
      [82.77333333333334, 261.12],
      [75.94666666666667, 267.94666666666666],
      [72.53333333333333, 273.92],
      [69.97333333333334, 279.8933333333333],
      [69.12, 285.0133333333333],
      [69.12, 290.9866666666667],
      [69.97333333333334, 298.6666666666667],
      [75.94666666666667, 308.05333333333334],
      [82.77333333333334, 315.73333333333335],
      [93.01333333333334, 323.41333333333336],
      [106.66666666666667, 330.24],
      [120.32000000000001, 332.8],
      [134.82666666666668, 333.65333333333336],
      [157.86666666666667, 330.24],
      [174.08, 323.41333333333336],
      [183.46666666666667, 317.44],
      [193.70666666666668, 310.61333333333334],
      [201.38666666666668, 303.7866666666667],
      [205.65333333333334, 297.81333333333333],
      [207.36, 291.84],
      [208.21333333333334, 283.3066666666667],
      [205.65333333333334, 273.92],
      [197.97333333333336, 262.82666666666665],
      [188.58666666666667, 251.73333333333335],
      [180.05333333333334, 244.90666666666664],
      [169.81333333333333, 238.07999999999998],
      [161.28, 233.81333333333333],
      [154.45333333333335, 231.25333333333333],
      [149.33333333333334, 230.39999999999998],
      [145.06666666666666, 230.39999999999998],
    ],
    label: labelFunction,
    dataAttrs: {
      'data-category': 'normal',
    },
  },
];

const controllerOptions: InsightViewerControllerOptions = {
  width: [600, 400, 1000],
  height: [700, 400, 1000],
  control: ['pan', ['none', 'pan', 'adjust']],
  wheel: ['zoom', ['none', 'zoom']],
  flip: [false],
  invert: [false],
};

const CustomStyleViewer = styled(ArrowedContourViewer)`
  --contour-viewer-color: blue;
  --contour-viewer-focused-color: red;
  --contour-viewer-fill-color: rgba(0, 0, 255, 0.3);
  --contour-viewer-focused-fill-color: rgba(255, 0, 0, 0.3);
`;

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

  // create contour data
  const { contours, focusedContour, focusContour } = useContour({
    mode: 'contour', // is [x, y][]
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
        interactions,
        element,
        setElement,
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
            <>
              <CustomStyleViewer
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
