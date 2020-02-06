import {
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  installWADOImageLoader,
  unloadWADOImage,
  useInsightViewerSync, withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { storiesOf } from '@storybook/react';
import React, { useMemo } from 'react';
import { useController, withTestController } from './decorators/withTestController';

installWADOImageLoader();

function Sample() {
  const resetTime: number = useMemo(() => Date.now(), []);
  
  const image: CornerstoneImage = useMemo(() => new CornerstoneSingleImage(`wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage}), []);
  
  const {
    width,
    height,
    control,
    wheel,
    invert,
    flip,
  } = useController();
  
  const {
    updateCornerstoneRenderData,
  } = useInsightViewerSync();
  
  return (
    <div>
      <InsightViewer width={width}
                     height={height}
                     invert={invert}
                     flip={flip}
                     pan={control === 'pan'}
                     adjust={control === 'adjust'}
                     zoom={wheel === 'zoom'}
                     resetTime={resetTime}
                     image={image}
                     updateCornerstoneRenderData={updateCornerstoneRenderData}/>
      <InsightViewer width={width}
                     height={height}
                     invert={invert}
                     flip={flip}
                     pan={control === 'pan'}
                     adjust={control === 'adjust'}
                     zoom={wheel === 'zoom'}
                     resetTime={resetTime}
                     image={image}
                     updateCornerstoneRenderData={updateCornerstoneRenderData}/>
      <InsightViewer width={width}
                     height={height}
                     invert={invert}
                     flip={flip}
                     pan={control === 'pan'}
                     adjust={control === 'adjust'}
                     zoom={wheel === 'zoom'}
                     resetTime={resetTime}
                     image={image}
                     updateCornerstoneRenderData={updateCornerstoneRenderData}/>
      <InsightViewer width={width}
                     height={height}
                     invert={invert}
                     flip={flip}
                     pan={control === 'pan'}
                     adjust={control === 'adjust'}
                     zoom={wheel === 'zoom'}
                     resetTime={resetTime}
                     image={image}
                     updateCornerstoneRenderData={updateCornerstoneRenderData}/>
    </div>
  );
}

storiesOf('insight-viewer', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .addDecorator(withTestController({
    width: [600, 400, 1000],
    height: [700, 400, 1000],
    control: ['pan', ['none', 'pan', 'adjust']],
    wheel: ['zoom', ['none', 'zoom']],
    flip: false,
    invert: false,
  }))
  .add('CornerstoneImage Multicast', () => <Sample/>);