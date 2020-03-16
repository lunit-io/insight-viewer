import {
  ContourViewer,
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  unloadImage,
  useContour,
  useInsightViewerSync,
} from '@lunit/insight-viewer';
import React, { useMemo, useState } from 'react';
import { initialContours } from '../../../__fixtures__/contour';

installWADOImageLoader();

const width: number = 400;
const height: number = 500;

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

  const { contours, focusedContour } = useContour({
    mode: 'contour',
    initialContours,
  });

  return (
    <InsightViewerContainer ref={setDivElement} width={width} height={height}>
      <InsightViewer
        width={width}
        height={height}
        invert={false}
        flip={false}
        pan={divElement}
        adjust={false}
        zoom={divElement}
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
    </InsightViewerContainer>
  );
};
