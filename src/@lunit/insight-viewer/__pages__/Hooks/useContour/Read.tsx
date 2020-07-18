import {
  ContourViewer,
  CornerstoneImage,
  CornerstoneSingleImage,
  CornerstoneViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  unloadImage,
  useContour,
  useInsightViewerSync,
  useViewerInteractions,
} from '@lunit/insight-viewer';
import React, { useMemo, useState } from 'react';
import { initialContours } from '../../../__fixtures__/contour';

installWADOImageLoader();

const width: number = 400;
const height: number = 500;

export default () => {
  const image: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000010.dcm`, {
        unload: unloadImage,
      }),
    [],
  );

  const [element, setElement] = useState<HTMLElement | null>(null);

  const { cornerstoneRenderData, updateCornerstoneRenderData } = useInsightViewerSync();

  const { contours, focusedContour } = useContour({
    mode: 'contour',
    initialContours,
  });

  const interactions = useViewerInteractions(['pan', 'zoom'], { element });

  return (
    <InsightViewerContainer ref={setElement} width={width} height={height}>
      <CornerstoneViewer
        width={width}
        height={height}
        invert={false}
        flip={false}
        interactions={interactions}
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
