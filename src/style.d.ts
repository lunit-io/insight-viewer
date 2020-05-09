/// <reference types="styled-components/cssprop" />

import { InsightTheme, InsightCSSProperties, Theme } from '@lunit/insight-ui';
import { InsightViewerCSSProperties } from '@lunit/insight-viewer';
import '@material-ui/styles/defaultTheme';
import 'react';
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme extends InsightTheme {}
}

declare module '@material-ui/styles/defaultTheme' {
  export interface DefaultTheme extends InsightTheme {}
}

declare module 'react' {
  export interface CSSProperties
    extends CSS.Properties<string | number>,
      InsightViewerCSSProperties,
      InsightCSSProperties {}
}
