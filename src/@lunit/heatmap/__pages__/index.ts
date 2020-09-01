import { HandbookTreeNode } from '@handbook/components';
import { source } from '@handbook/source';

export const heatmapPages: HandbookTreeNode = {
  'Pixel Computation': source(() => import('./PixelComputation.mdx')),
  'PosMap Rendering': source(() => import('./PosMapRendering.mdx')),
  'Heatmap Indicator': source(() => import('./HeatmapIndicator.mdx')),
};
