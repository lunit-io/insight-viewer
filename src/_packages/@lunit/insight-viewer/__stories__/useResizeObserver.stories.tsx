import {
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  unloadWADOImage,
  useInsightViewerSync,
} from '@lunit/insight-viewer';
import { storiesOf } from '@storybook/react';
import React from 'react';
import useResizeObserver from 'use-resize-observer';

installWADOImageLoader();

const resetTime: number = Date.now();
const image: CornerstoneImage = new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage});

function Sample() {
  const {
    updateCornerstoneRenderData,
  } = useInsightViewerSync();
  
  // 특정 Element의 width, height를 지속적으로 감지한다
  // flex 등 layout으로 처리된 <div> Element의 width, height를 useResizeObserver()로 받아서
  // <InsightViewer width={width} height={height}> 로 넘길 수 있다
  const [resizeRef, width, height] = useResizeObserver();
  
  console.log('useResizeObserver.stories.tsx..Sample()', width, height);
  
  return (
    <div ref={resizeRef} style={{width: '50vw', height: '80vh'}}>
      <InsightViewerContainer width={width} height={height}>
        <InsightViewer width={width}
                       height={height}
                       invert={false}
                       flip={false}
                       pan
                       adjust={false}
                       zoom={false}
                       resetTime={resetTime}
                       image={image}
                       updateCornerstoneRenderData={updateCornerstoneRenderData}/>
      </InsightViewerContainer>
    </div>
  );
}

storiesOf('insight-viewer', module)
  .add('useResizeObserver', () => <Sample/>);