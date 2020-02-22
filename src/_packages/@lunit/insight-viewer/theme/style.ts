import { ColorProperty } from 'csstype';
import { css } from 'styled-components';

export interface InsightViewerCSSProperties {
  '--contour-viewer-color'?: ColorProperty;
  '--contour-viewer-focused-color'?: ColorProperty;
  '--contour-viewer-stroke-width'?: ColorProperty;
  '--contour-viewer-focused-stroke-width'?: ColorProperty;
  '--contour-viewer-fill-color'?: ColorProperty;
  '--contour-viewer-focused-fill-color'?: ColorProperty;

  '--contour-drawer-color'?: ColorProperty;
  '--contour-drawer-stroke-width'?: ColorProperty;
  '--contour-drawer-fill-color'?: ColorProperty;

  '--pin-color'?: ColorProperty;
  '--pin-focused-color'?: ColorProperty;
}

export const globalStyle = css`
  :root {
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
  }
`;
