import { Property } from 'csstype';
import { css } from 'styled-components';

export interface InsightViewerCSSProperties {
  '--contour-viewer-color'?: Property.Color;
  '--contour-viewer-focused-color'?: Property.Color;
  '--contour-viewer-stroke-width'?: Property.Color;
  '--contour-viewer-focused-stroke-width'?: Property.Color;
  '--contour-viewer-fill-color'?: Property.Color;
  '--contour-viewer-focused-fill-color'?: Property.Color;

  '--contour-drawer-color'?: Property.Color;
  '--contour-drawer-stroke-width'?: Property.Color;
  '--contour-drawer-fill-color'?: Property.Color;

  '--pin-color'?: Property.Color;
  '--pin-focused-color'?: Property.Color;
}

export const blockStyle = css`
  --contour-viewer-color: #ffffff;
  --contour-viewer-focused-color: rgb(255, 194, 17);
  --contour-viewer-stroke-width: 3px;
  --contour-viewer-focused-stroke-width: 6px;
  --contour-viewer-fill-color: rgba(0, 0, 0, 0.2);
  --contour-viewer-focused-fill-color: rgba(0, 0, 0, 0.4);

  --contour-drawer-color: rgb(255, 224, 0);
  --contour-drawer-stroke-width: 4px;
  --contour-drawer-fill-color: rgba(255, 224, 0, 0.2);

  --pin-color: #ffffff;
  --pin-focused-color: rgb(255, 194, 17);
`;

export const globalStyle = css`
  :root {
    ${blockStyle};
  }
`;
