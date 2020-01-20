import {
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  ProgressViewer,
  unloadWADOImage,
  useInsightViewerSync,
  UserContourCanvasDrawer,
  UserContourCanvasViewer,
  useUserContour, withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { storiesOf } from '@storybook/react';
import React, { useMemo, useState } from 'react';
import { useController, withTestController } from './decorators/withTestController';

installWADOImageLoader();

function Sample() {
  const resetTime: number = useMemo(() => Date.now(), []);
  const image: CornerstoneImage = useMemo(() => new CornerstoneSingleImage(`wadouri:https://elegant-jackson-8b43a6.netlify.com/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage}), []);
  
  const {
    width,
    height,
    control,
    wheel,
    invert,
    flip,
  } = useController();
  
  const [interactionElement, setInteractionElement] = useState<HTMLElement | null>(null);
  
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
  
  return (
    <InsightViewerContainer ref={setInteractionElement} width={width} height={height}>
      <InsightViewer width={width}
                     height={height}
                     invert={invert}
                     flip={flip}
                     pan={control === 'pan' && interactionElement}
                     adjust={control === 'adjust' && interactionElement}
                     zoom={wheel === 'zoom' && interactionElement}
                     resetTime={resetTime}
                     image={image}
                     updateCornerstoneRenderData={updateCornerstoneRenderData}/>
      {
        contours &&
        contours.length > 0 &&
        cornerstoneRenderData &&
        // Canvas Style을 변경할 수 있다
        <UserContourCanvasViewer width={width}
                                 height={height}
                                 contours={contours}
                                 focusedContour={focusedContour}
                                 cornerstoneRenderData={cornerstoneRenderData}
        
                                 canvasStrokeLineWidth={10}
                                 canvasStrokeStyle="blue"
                                 canvasFillStyle="rgba(0, 0, 255, 0.3)"
                                 canvasFontStyle="normal normal 600 40px proximanova"
                                 canvasFocusedStrokeLineWidth={20}
                                 canvasFocusedStrokeStyle="red"
                                 canvasFocusedFillStyle="rgba(255, 0, 0, 0.3)"
                                 canvasFocusedFontStyle="normal normal 600 50px proximanova"/>
      }
      {
        contours &&
        cornerstoneRenderData &&
        control === 'pen' &&
        // Canvas Style을 변경할 수 있다
        <UserContourCanvasDrawer width={width}
                                 height={height}
                                 contours={contours}
                                 draw={control === 'pen' && interactionElement}
                                 onFocus={focusContour}
                                 onAdd={contour => addContour(contour)}
                                 onRemove={removeContour}
                                 cornerstoneRenderData={cornerstoneRenderData}
        
                                 canvasStokeLineWidth={8}
                                 canvasStokeStyle="purple"
                                 canvasFillStyle="rgba(255, 255, 255, 0.4)"/>
      }
      <ProgressViewer image={image}
                      width={width}
                      height={height}/>
    </InsightViewerContainer>
  );
}

storiesOf('insight-viewer', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .addDecorator(withTestController({
    width: [600, 400, 1000],
    height: [700, 400, 1000],
    control: ['pen', ['none', 'pen', 'pan', 'adjust']],
    wheel: ['zoom', ['none', 'zoom']],
    flip: false,
    invert: false,
  }))
  .add('<UserContourCanvasViewer canvasStokeStyle="{}">', () => <Sample/>);