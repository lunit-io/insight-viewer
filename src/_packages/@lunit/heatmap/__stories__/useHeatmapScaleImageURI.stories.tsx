import { useHeatmapScaleImageURI } from '@lunit/heatmap';
import { withInsightViewerStorybookGlobalStyle } from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { number, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

export default {
  title: 'heatmap',
  decorators: [withInsightViewerStorybookGlobalStyle, withOPTComponentsStorybookGlobalStyle, withKnobs],
};

export const useHeatmapScaleImageURISample = () => {
  const width: number = number('Width', 300, { range: true, step: 10, min: 100, max: 600 });
  const height: number = number('Height', 100, { range: true, step: 10, min: 60, max: 300 });
  const threshold: number = number('Threshold', 0, { range: true, step: 0.1, min: 0, max: 1 });

  const dataUri: string | null = useHeatmapScaleImageURI({ width, height, threshold });

  return dataUri ? <img src={dataUri} style={{ width, height, backgroundColor: '#000000' }} alt="test" /> : null;
};

useHeatmapScaleImageURISample.story = {
  name: 'useHeatmapScaleImageURI()',
};
