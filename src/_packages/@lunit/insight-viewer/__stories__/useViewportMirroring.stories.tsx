import {
  CornerstoneBulkImage,
  CornerstoneImage,
  CornerstoneSeriesImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  unloadWADOImage,
  useBulkImageScroll,
  useInsightViewerSync,
  UserContourDrawer,
  UserContourViewer,
  useUserContour,
  useViewportMirroring,
} from '@lunit/insight-viewer';
import { storiesOf } from '@storybook/react';
import React, { RefObject, useRef, useState } from 'react';
import { useController, withTestController } from './decorators/withTestController';
import series from './series.json';

installWADOImageLoader();

const resetTime: number = Date.now();
const image1: CornerstoneImage = new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage});
const image2: CornerstoneImage = new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000020.dcm`, {unload: unloadWADOImage});
const image3: CornerstoneImage = new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000030.dcm`, {unload: unloadWADOImage});
const image4: CornerstoneBulkImage = new CornerstoneSeriesImage(series.map(p => `wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/${p}`), {unload: unloadWADOImage});

function Sample() {
  const {
    width,
    height,
    invert,
    flip,
  } = useController();
  
  // Viewport Mirroring의 대상에게 부여할 RefObject 들을 만든다
  const viewer2: RefObject<InsightViewer> = useRef(null);
  const viewer3: RefObject<InsightViewer> = useRef(null);
  const viewer4: RefObject<InsightViewer> = useRef(null);
  
  // updateMasterRenderData()가 실행되면 viewer2, viewer3, viewer4에 Viewport가 Mirroring 된다
  const {updateMasterRenderData} = useViewportMirroring(viewer2, viewer3, viewer4);
  
  // 3번째 화면을 위한 처리
  const [interactionElement3, setInteractionElement3] = useState<HTMLElement | null>(null);
  
  const {
    cornerstoneRenderData,
    updateCornerstoneRenderData,
  } = useInsightViewerSync();
  
  const {
    contours,
    focusedContour,
    addContour,
    removeContour,
    focusContour,
  } = useUserContour();
  
  // 4번째 화면을 위한 처리
  const [interactionElement4, setInteractionElement4] = useState<HTMLElement | null>(null);
  
  useBulkImageScroll({
    image: image4,
    element: interactionElement4,
    enabled: true,
  });
  
  return (
    <div style={{display: 'flex'}}>
      <InsightViewerContainer width={width} height={height}>
        <InsightViewer width={width}
                       height={height}
                       invert={invert}
                       flip={flip}
                       pan
                       adjust={false}
                       zoom
                       resetTime={resetTime}
                       image={image1}
                       updateCornerstoneRenderData={updateMasterRenderData}/>
      </InsightViewerContainer>
      
      <InsightViewerContainer width={width} height={height}>
        <InsightViewer ref={viewer2}
                       width={width}
                       height={height}
                       invert={invert}
                       flip={flip}
                       pan={false}
                       adjust
                       zoom={false}
                       resetTime={resetTime}
                       image={image2}
                       updateCornerstoneRenderData={renderData => console.log('#2', renderData)}/>
      </InsightViewerContainer>
      
      <InsightViewerContainer ref={setInteractionElement3} width={width} height={height}>
        <InsightViewer ref={viewer3}
                       width={width}
                       height={height}
                       invert={invert}
                       flip={flip}
                       pan={false}
                       adjust={false}
                       zoom={false}
                       resetTime={resetTime}
                       image={image3}
                       updateCornerstoneRenderData={updateCornerstoneRenderData}/>
        {
          contours &&
          contours.length > 0 &&
          cornerstoneRenderData &&
          <UserContourViewer width={width}
                             height={height}
                             contours={contours}
                             focusedContour={focusedContour}
                             cornerstoneRenderData={cornerstoneRenderData}/>
        }
        {
          contours &&
          cornerstoneRenderData &&
          <UserContourDrawer width={width}
                             height={height}
                             contours={contours}
                             draw={interactionElement3}
                             onFocus={focusContour}
                             onAdd={contour => addContour(contour, 0)}
                             onRemove={removeContour}
                             cornerstoneRenderData={cornerstoneRenderData}/>
        }
      </InsightViewerContainer>
      
      <InsightViewerContainer ref={setInteractionElement4} width={width} height={height}>
        <InsightViewer ref={viewer4}
                       width={width}
                       height={height}
                       invert={invert}
                       flip={flip}
                       pan={false}
                       adjust={false}
                       zoom={false}
                       resetTime={resetTime}
                       image={image4}
                       updateCornerstoneRenderData={renderData => console.log('#4', renderData)}/>
      </InsightViewerContainer>
    </div>
  );
}

storiesOf('insight-viewer', module)
  .addDecorator(withTestController({
    width: [300, 200, 500],
    height: [400, 300, 600],
    control: ['none', ['none']],
    wheel: ['none', ['none']],
    flip: false,
    invert: false,
  }))
  .add('useViewportMirroring()', () => <Sample/>);