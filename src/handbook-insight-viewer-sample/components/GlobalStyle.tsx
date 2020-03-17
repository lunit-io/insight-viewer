import { globalStyle as componentsGlobalStyle } from '@lunit/opt-components';
import { globalStyle as insightViewerGlobalStyle } from '@lunit/insight-viewer';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  ${componentsGlobalStyle}
  ${insightViewerGlobalStyle}
  
  html {
    font-size: 14px;
    box-sizing: border-box;
  }
  
  html, body {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  
  #app {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
`;
