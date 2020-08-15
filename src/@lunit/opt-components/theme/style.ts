import { Property } from 'csstype';
import { createGlobalStyle, css } from 'styled-components';

export interface OPTComponentsCSSProperties {
  '--button-background-color'?: Property.Color;
  '--button-label-color'?: Property.Color;
  '--button-background-color-hover'?: Property.Color;
  '--button-label-color-hover'?: Property.Color;
  '--button-background-color-selected'?: Property.Color;
  '--button-label-color-selected'?: Property.Color;
  '--button-background-color-disabled'?: Property.Color;
  '--button-label-color-disabled'?: Property.Color;

  '--panel-background-color'?: Property.Color;
  '--panel-header-background-color'?: Property.Color;
  '--panel-icon-color'?: Property.Color;
  '--panel-icon-color-hover'?: Property.Color;
  '--panel-title-color'?: Property.Color;

  '--slider-rail-color'?: Property.Color;
  '--slider-thumb-color'?: Property.Color;
  '--slider-track-color'?: Property.Color;
  '--slider-value-label-color'?: Property.Color;

  '--tooltip-background-color'?: Property.Color;
  '--tooltip-color'?: Property.Color;
}

export const blockStyle = css`
  --button-background-color: rgba(255, 255, 255, 0.2);
  --button-label-color: rgba(255, 255, 255, 0.7);
  --button-background-color-hover: rgba(255, 255, 255, 0.35);
  --button-label-color-hover: rgba(255, 255, 255, 0.9);
  --button-background-color-selected: #00a4c8;
  --button-label-color-selected: #ffffff;
  --button-background-color-disabled: rgba(255, 255, 255, 0.12);
  --button-label-color-disabled: rgba(255, 255, 255, 0.2);

  --panel-background-color: #242e3e;
  --panel-header-background-color: rgba(255, 255, 255, 0.03);
  --panel-icon-color: #8694b1;
  --panel-icon-color-hover: #c5d8f8;
  --panel-title-color: #ffffff;

  --slider-rail-color: rgba(255, 255, 255, 0.4);
  --slider-thumb-color: #ffffff;
  --slider-track-color: rgba(255, 255, 255, 0.6);
  --slider-value-label-color: rgba(0, 0, 0, 0.4);

  --tooltip-background-color: rgba(0, 0, 0, 0.7);
  --tooltip-label-color: #ffffff;

  --snackbar-background-color: rgba(0, 0, 0, 0.7);
  --snackbar-label-color: #ffffff;

  --switch-color: #eeeeee;
  --switch-track-color: rgba(255, 255, 255, 0.2);
  --switch-color-checked: #00a5c8;
  --switch-track-color-checked: rgba(255, 255, 255, 0.2);
`;

export const globalStyle = css`
  :root {
    ${blockStyle};
  }

  body {
    color: white;
    background-color: #222232;
  }

  body,
  button,
  input,
  optgroup,
  select,
  textarea,
  pre {
    font-family: proximanova, noto_sanslight, sans-serif;
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 0.6px;
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${globalStyle}
`;
