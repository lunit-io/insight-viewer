/// <reference types="styled-components/cssprop" />

import { Theme } from '@lunit/insight-ui';
import { InsightViewerCSSProperties } from '@lunit/insight-viewer';
import '@material-ui/styles/defaultTheme';
import 'react';
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

//declare module '@material-ui/styles' {
//  export interface DefaultTheme extends Theme {}
//}

declare module '@material-ui/styles/defaultTheme' {
  export interface DefaultTheme extends Theme {}
}

declare module 'react' {
  export interface CSSProperties extends CSS.Properties<string | number>, InsightViewerCSSProperties {}
}
