import {
  ContourDrawer,
  ContourViewer,
  CornerstoneBulkImage,
  CornerstoneSeriesImage,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  ProgressViewer,
  unloadWADOImage,
  useBulkImageScroll,
  useImageProgress,
  useInsightViewerSync,
  useUserContour, withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { storiesOf } from '@storybook/react';
import React, { useMemo, useState } from 'react';
import { useController, withTestController } from './decorators/withTestController';
import series from './series.json';

installWADOImageLoader();

function Component() {
  const resetTime: number = useMemo(() => Date.now(), []);
  // CornerstoneSeriesImage는 여러장의 dcm 이미지를 받는다
  const image: CornerstoneBulkImage = useMemo(() => new CornerstoneSeriesImage(series.map(p => `wadouri:https://elegant-jackson-8b43a6.netlify.com/dcm-files/series/${p}`), {unload: unloadWADOImage}), []);
  
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
  
  // CornerstoneBulkImage를 Wheel과 연결 시킨다
  useBulkImageScroll({
    image,
    element: interactionElement,
    enabled: wheel === 'scroll',
  });
  
  const imageProgress = useImageProgress(image);
  
  return (
    <div>
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
          <ContourViewer width={width}
                         height={height}
                         contours={contours}
                         focusedContour={focusedContour}
                         cornerstoneRenderData={cornerstoneRenderData}/>
        }
        {
          contours &&
          cornerstoneRenderData &&
          control === 'pen' &&
          <ContourDrawer width={width}
                         height={height}
                         contours={contours}
                         draw={control === 'pen' && interactionElement}
                         onFocus={focusContour}
                         onAdd={contour => addContour(contour)}
                         onRemove={removeContour}
                         cornerstoneRenderData={cornerstoneRenderData}/>
        }
        <ProgressViewer image={image}
                        width={width}
                        height={height}/>
      </InsightViewerContainer>
      
      {
        typeof imageProgress === 'number' &&
        <button onClick={() => image.destroy()}>
          Destroy Image (= Cancel Loading)
        </button>
      }
    </div>
  );
}

storiesOf('insight-viewer', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .addDecorator(withTestController({
    width: [600, 400, 1000],
    height: [700, 400, 1000],
    control: ['pan', ['none', 'pen', 'pan', 'adjust']],
    wheel: ['scroll', ['none', 'zoom', 'scroll']],
    flip: false,
    invert: false,
  }))
  //.addDecorator(withSeriesImageController(image))
  .add('Series Image', () => <Component/>);