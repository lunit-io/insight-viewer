import styled from 'styled-components';
import { Contour } from '../types';
import { dashStroke } from './animation/dashStroke';
import { ContourDrawerBase } from './ContourDrawer';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const LineDrawer: new <T extends Contour>() => ContourDrawerBase<
  T
> = styled(ContourDrawerBase)`
  position: absolute;
  top: 0;
  left: 0;

  --color: rgb(255, 224, 0);
  --stroke-width: 4px;

  > polyline:first-child {
    stroke: var(--contour-drawer-color, var(--color));
    stroke-width: var(--contour-drawer-stroke-width, var(--stroke-width));
    fill: transparent;
  }

  > polyline[data-highlight] {
    stroke: #ffffff;
    stroke-width: var(--contour-drawer-stroke-width, var(--stroke-width));
    fill: transparent;
    ${dashStroke}
  }
` as any;
