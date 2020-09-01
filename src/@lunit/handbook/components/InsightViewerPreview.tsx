import { Preview, PreviewProps } from '@handbook/components';
import { blockStyle as insightViewerStyle } from '@lunit/insight-viewer';
import {
  blockStyle as componentsStyle,
  ThemeProvider,
} from '@lunit/opt-components';
import { SnackbarProvider } from '@ssen/snackbar';
import React from 'react';
import styled from 'styled-components';

export function InsightViewerPreview(props: PreviewProps) {
  return (
    <Style data-test="style block">
      <SnackbarProvider>
        <ThemeProvider injectFirst={false}>
          <Preview {...props} />
        </ThemeProvider>
      </SnackbarProvider>
    </Style>
  );
}

const Style = styled.div`
  ${insightViewerStyle};
  ${componentsStyle};

  > :first-child {
    color: white;
    background-color: #222232;
    overflow: hidden;
  }
`;
