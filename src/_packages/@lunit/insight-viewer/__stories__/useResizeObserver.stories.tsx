import {
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  unloadWADOImage,
  useInsightViewerSync,
  withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { storiesOf } from '@storybook/react';
import React, { useMemo } from 'react';
import useResizeObserver from 'use-resize-observer/polyfilled';

installWADOImageLoader();

function Sample() {
  const resetTime: number = useMemo(() => Date.now(), []);
  const image: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000010.dcm`, {
        unload: unloadWADOImage,
      }),
    [],
  );

  const { updateCornerstoneRenderData } = useInsightViewerSync();

  // 특정 Element의 width, height를 지속적으로 감지한다
  // flex 등 layout으로 처리된 <div> Element의 width, height를 useResizeObserver()로 받아서
  // <InsightViewer width={width} height={height}> 로 넘길 수 있다
  const { ref: resizeRef, width = 500, height = 500 } = useResizeObserver<HTMLDivElement>({});

  return (
    <div ref={resizeRef} style={{ width: '50vw', height: '80vh' }}>
      <InsightViewerContainer width={width} height={height}>
        <InsightViewer
          width={width}
          height={height}
          invert={false}
          flip={false}
          pan
          adjust={false}
          zoom={false}
          resetTime={resetTime}
          image={image}
          updateCornerstoneRenderData={updateCornerstoneRenderData}
        />
      </InsightViewerContainer>
    </div>
  );
}

storiesOf('library/use-resize-observer', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .add('basic', () => <Sample />);
