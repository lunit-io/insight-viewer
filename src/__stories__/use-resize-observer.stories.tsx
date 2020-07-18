import {
  CornerstoneImage,
  CornerstoneSingleImage,
  CornerstoneViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  unloadImage,
  useInsightViewerSync,
  useViewerInteractions,
  withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import React, { useMemo } from 'react';
import useResizeObserver from 'use-resize-observer/polyfilled';

installWADOImageLoader();

export default {
  title: 'libraries',
  decorators: [withInsightViewerStorybookGlobalStyle, withOPTComponentsStorybookGlobalStyle],
};

export const useResizeObserverSample = () => {
  const resetTime: number = useMemo(() => Date.now(), []);
  const image: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000010.dcm`, {
        unload: unloadImage,
      }),
    [],
  );

  const { updateCornerstoneRenderData } = useInsightViewerSync();

  // 특정 Element의 width, height를 지속적으로 감지한다
  // flex 등 layout으로 처리된 <div> Element의 width, height를 useResizeObserver()로 받아서
  // <CornerstoneViewer width={width} height={height}> 로 넘길 수 있다
  const { ref: resizeRef, width = 500, height = 500 } = useResizeObserver<HTMLDivElement>({});

  const interactions = useViewerInteractions(['pan']);

  return (
    <div ref={resizeRef} style={{ width: '50vw', height: '80vh' }}>
      <InsightViewerContainer width={width} height={height}>
        <CornerstoneViewer
          width={width}
          height={height}
          invert={false}
          flip={false}
          interactions={interactions}
          resetTime={resetTime}
          image={image}
          updateCornerstoneRenderData={updateCornerstoneRenderData}
        />
      </InsightViewerContainer>
    </div>
  );
};

useResizeObserverSample.story = {
  name: 'use-resize-observer',
};
