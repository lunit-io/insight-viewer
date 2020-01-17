import { HeatmapScaleSVGImage } from '@lunit/heatmap';
import { withInsightViewerStorybookGlobalStyle } from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { number, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

/**
 * Heatmap이 그려진 SVG <image>를 만든다
 * <svg>를 사용해서 별도의 디자인을 구현하려고 할때 사용할 수 있다
 */
storiesOf('heatmap', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .addDecorator(withKnobs)
  .add('<HeatmapScaleSVGImage>', () => {
    const width: number = number('Width', 300, {range: true, step: 10, min: 100, max: 600});
    const height: number = number('Height', 100, {range: true, step: 10, min: 60, max: 300});
    const threshold: number = number('Threshold', 0, {range: true, step: 0.1, min: 0, max: 1});
    
    return (
      <svg width={width} height={height}>
        <rect width={width} height={height} fill="#000000"/>
        <HeatmapScaleSVGImage width={width} height={height} threshold={threshold}/>
      </svg>
    );
  });