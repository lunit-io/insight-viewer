import {
  ContourDrawer,
  ContourViewer,
  CornerstoneImage,
  CornerstoneSingleImage,
  CornerstoneViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  unloadImage,
  useContour,
  useInsightViewerSync,
} from '@lunit/insight-viewer';
import React, { useMemo, useState } from 'react';

installWADOImageLoader();

const width: number = 400;
const height: number = 500;

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

  const [divElement, setDivElement] = useState<HTMLDivElement | null>(null);

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
  } = useContour();

  return (
    <InsightViewerContainer ref={setDivElement} width={width} height={height}>
      <CornerstoneViewer
        width={width}
        height={height}
        invert={false}
        flip={false}
        resetTime={0}
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
      {contours && cornerstoneRenderData && (
        <ContourDrawer
          width={width}
          height={height}
          contours={contours}
          draw={divElement}
          onFocus={focusContour}
          onAdd={(contour) => addContour(contour)}
          onRemove={removeContour}
          cornerstoneRenderData={cornerstoneRenderData}
        />
      )}
    </InsightViewerContainer>
  );
};
