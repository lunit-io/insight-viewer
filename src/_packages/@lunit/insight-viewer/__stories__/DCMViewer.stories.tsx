import {
  CornerstoneImage,
  CornerstoneSingleImage,
  installWADOImageLoader,
  unloadWADOImage,
} from '@lunit/insight-viewer';
import { DCMImage } from '@lunit/insight-viewer/components/DCMImage';
import { storiesOf } from '@storybook/react';
import React from 'react';

installWADOImageLoader();

const image1: CornerstoneImage = new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage});
const image2: CornerstoneImage = new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000011.dcm`, {unload: unloadWADOImage});
const image3: CornerstoneImage = new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000012.dcm`, {unload: unloadWADOImage});
const image4: CornerstoneImage = new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000013.dcm`, {unload: unloadWADOImage});

storiesOf('insight-viewer', module)
  .add('<DCMImage>', () => (
    <ul>
      {
        [image1, image2, image3, image4].map((image, i) => (
          <li key={'image' + i}>
            <DCMImage cornerstoneImage={image} width={120} height={150}/>
          </li>
        ))
      }
    </ul>
  ));