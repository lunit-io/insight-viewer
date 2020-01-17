import {
  CornerstoneImage,
  ImageStoreProvider,
  InsightViewer,
  installWADOImageLoader,
  useImageProgress,
  useImageStore,
  useInsightViewerSync, withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { storiesOf } from '@storybook/react';
import React, { useMemo, useState } from 'react';
import { useController, withTestController } from './decorators/withTestController';

installWADOImageLoader();

function Sample() {
  const resetTime: number = useMemo(() => Date.now(), []);
  
  const {fetch} = useImageStore();
  
  const image1: CornerstoneImage = fetch(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000010.dcm`);
  const image2: CornerstoneImage = fetch(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000011.dcm`);
  const image3: CornerstoneImage = fetch(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000012.dcm`);
  const image4: CornerstoneImage = fetch(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000013.dcm`);
  
  const progress1 = useImageProgress(image2);
  const progress2 = useImageProgress(image1);
  const progress3 = useImageProgress(image3);
  const progress4 = useImageProgress(image4);
  
  const [image, setImage] = useState<CornerstoneImage>(() => image1);
  
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
    <div style={{display: 'flex'}}>
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
      <div>
        <ul>
          <li>
            1: {progress1 || 'loaded'}
            {
              image !== image1 &&
              <button onClick={() => setImage(image1)}>show</button>
            }
          </li>
          <li>
            2: {progress2 || 'loaded'}
            {
              image !== image2 &&
              <button onClick={() => setImage(image2)}>show</button>
            }
          </li>
          <li>
            3: {progress3 || 'loaded'}
            {
              image !== image3 &&
              <button onClick={() => setImage(image3)}>show</button>
            }
          </li>
          <li>
            4: {progress4 || 'loaded'}
            {
              image !== image4 &&
              <button onClick={() => setImage(image4)}>show</button>
            }
          </li>
        </ul>
      </div>
    </div>
  );
}

storiesOf('insight-viewer', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .addDecorator(storyFn => (
    <ImageStoreProvider>
      {storyFn()}
    </ImageStoreProvider>
  ))
  .addDecorator(withTestController({
    width: [600, 400, 1000],
    height: [700, 400, 1000],
    control: ['pan', ['none', 'pan', 'adjust']],
    wheel: ['zoom', ['none', 'zoom']],
    flip: false,
    invert: false,
  }))
  .add('useImageStore', () => <Sample/>);