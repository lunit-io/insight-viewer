import { withInsightViewerStorybookGlobalStyle } from '@lunit/insight-viewer';
import { Slider, withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

storiesOf('opt-components', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .add('Slider', () => (
    <div style={{ width: 300, margin: 20 }}>
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: '10px 30px' }}>
        <Slider defaultValue={50} />
      </div>

      <div style={{ backgroundColor: 'rgba(255, 255, 255, 1)', padding: '10px 30px' }}>
        <BlueSlider defaultValue={50} />
      </div>
    </div>
  ));

export const BlueSlider = styled(Slider)`
  --slider-rail-color: rgba(86, 81, 136, 0.4);
  --slider-thumb-color: #6b6b9b;
  --slider-track-color: rgba(86, 81, 136, 0.6);
  --slider-value-label-color: #ffffff;
`;
