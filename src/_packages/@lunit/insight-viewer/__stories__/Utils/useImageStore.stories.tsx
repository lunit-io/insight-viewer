import {
  CornerstoneImage,
  ImageStoreProvider,
  InsightViewer,
  InsightViewerControllerOptions,
  InsightViewerTestController,
  installWADOImageLoader,
  useImageProgress,
  useImageStore,
  withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';

installWADOImageLoader();

const controllerOptions: InsightViewerControllerOptions = {
  width: [600, 400, 1000],
  height: [700, 400, 1000],
  control: ['pan', ['none', 'pan', 'adjust']],
  wheel: ['zoom', ['none', 'zoom']],
  flip: [false],
  invert: [false],
};

const Sample = () => {
  const { fetch } = useImageStore();

  const image1: CornerstoneImage = fetch(
    `wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000010.dcm`,
  );
  const image2: CornerstoneImage = fetch(
    `wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000011.dcm`,
  );
  const image3: CornerstoneImage = fetch(
    `wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000012.dcm`,
  );
  const image4: CornerstoneImage = fetch(
    `wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000013.dcm`,
  );

  const progress1 = useImageProgress(image2);
  const progress2 = useImageProgress(image1);
  const progress3 = useImageProgress(image3);
  const progress4 = useImageProgress(image4);

  const [image, setImage] = useState<CornerstoneImage>(() => image1);

  return (
    <div style={{ display: 'flex' }}>
      <InsightViewerTestController options={controllerOptions}>
        {({ width, height, invert, flip, control, wheel, resetTime }) => (
          <InsightViewer
            width={width}
            height={height}
            invert={invert} // 색상을 반전한다
            flip={flip} // 이미지를 좌우로 뒤집는다
            pan={control === 'pan'} // Pan Interaction을 활성화 한다
            adjust={control === 'adjust'} // Adjust Interaction을 활성화 한다 (Pan과 동시에 사용할 수 없다)
            zoom={wheel === 'zoom'} // Zoom Interaction을 활성화 한다
            resetTime={resetTime} // 이 값이 변경되면 Pan, Adjust, Zoom 상태가 초기화 된다
            image={image}
            updateCornerstoneRenderData={() => {}}
          />
        )}
      </InsightViewerTestController>
      <div>
        <ul>
          <li>
            1: {progress1 || 'loaded'}
            {image !== image1 && <button onClick={() => setImage(image1)}>show</button>}
          </li>
          <li>
            2: {progress2 || 'loaded'}
            {image !== image2 && <button onClick={() => setImage(image2)}>show</button>}
          </li>
          <li>
            3: {progress3 || 'loaded'}
            {image !== image3 && <button onClick={() => setImage(image3)}>show</button>}
          </li>
          <li>
            4: {progress4 || 'loaded'}
            {image !== image4 && <button onClick={() => setImage(image4)}>show</button>}
          </li>
        </ul>
      </div>
    </div>
  );
};

storiesOf('insight-viewer/Utils', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .addDecorator(storyFn => <ImageStoreProvider>{storyFn()}</ImageStoreProvider>)
  .add('useImageStore()', () => <Sample />);
