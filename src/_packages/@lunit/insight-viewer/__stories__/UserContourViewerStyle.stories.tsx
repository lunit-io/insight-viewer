import {
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  ProgressViewer,
  unloadWADOImage,
  useInsightViewerSync,
  UserContourDrawer,
  UserContourViewer,
  useUserContour,
} from '@lunit/insight-viewer';
import { storiesOf } from '@storybook/react';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useController, withTestController } from './decorators/withTestController';

installWADOImageLoader();

const Viewer = styled(UserContourViewer)`
  > polygon {
    stroke-width: 10px;
    stroke: blue;
    fill: rgba(0, 0, 255, 0.3);
    
    &[data-focused] {
      stroke-width: 20px;
      stroke: red;
      fill: rgba(255, 0, 0, 0.3);
    }
  }
  
  > text {
    fill: blue;
   
    &[data-focused] {
      fill: red;
    }
  }

`;

const Drawer = styled(UserContourDrawer)`
  > polyline {
    stroke: purple;
    stroke-width: 8px;
    fill: rgba(255, 255, 255, 0.4);
  }
`;

function Sample() {
  const resetTime: number = Date.now();
  const image: CornerstoneImage = useMemo(() => new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage}), []);
  
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
        <Viewer width={width}
                height={height}
                contours={contours}
                focusedContour={focusedContour}
                cornerstoneRenderData={cornerstoneRenderData}/>
      }
      {
        contours &&
        cornerstoneRenderData &&
        control === 'pen' &&
        // Canvas Style을 변경할 수 있다
        <Drawer width={width}
                height={height}
                contours={contours}
                draw={control === 'pen' && interactionElement}
                onFocus={focusContour}
                onAdd={contour => addContour(contour, 0)}
                onRemove={removeContour}
                cornerstoneRenderData={cornerstoneRenderData}/>
      }
      <ProgressViewer image={image}
                      width={width}
                      height={height}/>
    </InsightViewerContainer>
  );
}

storiesOf('insight-viewer', module)
  .addDecorator(withTestController({
    width: [600, 400, 1000],
    height: [700, 400, 1000],
    control: ['pen', ['none', 'pen', 'pan', 'adjust']],
    wheel: ['zoom', ['none', 'zoom']],
    flip: false,
    invert: false,
  }))
  .add('<UserContourViewer className="">', () => <Sample/>);