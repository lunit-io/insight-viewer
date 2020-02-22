import {
  CornerstoneImage,
  CornerstoneSingleImage,
  DCMImage,
  installWADOImageLoader,
  unloadWADOImage,
  withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { storiesOf } from '@storybook/react';
import React, { useMemo } from 'react';

installWADOImageLoader();

storiesOf('insight-viewer', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .add('<DCMImage>', () => {
    const image1: CornerstoneImage = useMemo(
      () =>
        new CornerstoneSingleImage(
          `wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000010.dcm`,
          { unload: unloadWADOImage },
        ),
      [],
    );
    const image2: CornerstoneImage = useMemo(
      () =>
        new CornerstoneSingleImage(
          `wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000011.dcm`,
          { unload: unloadWADOImage },
        ),
      [],
    );
    const image3: CornerstoneImage = useMemo(
      () =>
        new CornerstoneSingleImage(
          `wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000012.dcm`,
          { unload: unloadWADOImage },
        ),
      [],
    );
    const image4: CornerstoneImage = useMemo(
      () =>
        new CornerstoneSingleImage(
          `wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000013.dcm`,
          { unload: unloadWADOImage },
        ),
      [],
    );

    return (
      <ul>
        {[image1, image2, image3, image4].map((image, i) => (
          <li key={'image' + i}>
            <DCMImage cornerstoneImage={image} width={120} height={150} />
          </li>
        ))}
      </ul>
    );
  });
