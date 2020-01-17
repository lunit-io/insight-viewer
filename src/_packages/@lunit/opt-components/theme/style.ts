import { createGlobalStyle, css } from 'styled-components';

export const globalStyle = css`
  :root {
    --background-color: #222232;
    --font-color: white;
    
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
    --panel-icon-color: #8694B1;
    --panel-icon-color-hover: #c5d8f8;
    --panel-title-color: #ffffff;
    
    --slider-rail-color: rgba(255, 255, 255, 0.4);
    --slider-thumb-color: #ffffff;
    --slider-track-color: rgba(255, 255, 255, 0.6);
    --slider-value-label-color: rgba(0, 0, 0, 0.4);
    
    --tooltip-background-color: rgba(0, 0, 0, 0.7);
    --tooltip-color: #ffffff;
    
    --switch-color: #eeeeee;
    --switch-track-color: rgba(255, 255, 255, 0.2);
    --switch-color-checked: #00a5c8;
    --switch-track-color-checked: rgba(255, 255, 255, 0.2);
  }
  
  body {
    color: var(--font-color);
    background-color: var(--background-color);
  }
  
  body, button, input, optgroup, select, textarea {
    font-family: proximanova,noto_sanslight,sans-serif;
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 0.6px;
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${globalStyle}
`;