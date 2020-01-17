/// <reference types="styled-components/cssprop" />

import { InsightViewerCSSProperties } from '@lunit/insight-viewer';
import { OPTComponentsCSSProperties, Theme } from '@lunit/opt-components';
import 'react';
import 'styled-components';

declare module 'styled-components' {
  // styled-components 사용 시 ${({theme}) => theme.app.backgroundColor} 와 같은
  // Type Assist를 받기 위해서는 DefaultTheme 를 Override 해줘야 한다
  export interface DefaultTheme extends Theme {
  }
}

declare module 'react' {
  export interface CSSProperties extends CSS.Properties<string | number>, OPTComponentsCSSProperties, InsightViewerCSSProperties {
  }
}