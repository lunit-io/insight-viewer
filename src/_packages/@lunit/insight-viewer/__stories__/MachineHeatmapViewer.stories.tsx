import {
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  MachineHeatmapViewer,
  ProgressViewer,
  unloadWADOImage,
  useInsightViewerSync,
  UserContourDrawer,
  UserContourViewer,
  useUserContour,
} from '@lunit/insight-viewer';
import { storiesOf } from '@storybook/react';
import React, { useMemo, useState } from 'react';
import { useController, withTestController } from './decorators/withTestController';
import data from './posMap.sample.json';

const {engine_result: {engine_result: {pos_map: posMap}}} = data;

installWADOImageLoader();

function Sample() {
  const resetTime: number = useMemo(() => Date.now(), []);
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
      {/*
      engineResult.posMap을 그리는 Layer
      현재 Heatmap Spec (number[][])에 맞춰서 개발되었기 때문에
      Spec이 다르다면 새로운 Viewer를 만들어야 한다
      */}
      <MachineHeatmapViewer width={width}
                            height={height}
                            posMap={posMap}
                            threshold={0.1}
                            cornerstoneRenderData={cornerstoneRenderData}/>
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
        control === 'pen' &&
        <UserContourDrawer width={width}
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
  );
}

storiesOf('insight-viewer', module)
  .addDecorator(withTestController({
    width: [600, 400, 1000],
    height: [700, 400, 1000],
    control: ['pan', ['none', 'pen', 'pan', 'adjust']],
    wheel: ['zoom', ['none', 'zoom']],
    flip: false,
    invert: false,
  }))
  .add('<MachineHeatmapViewer>', () => <Sample/>);