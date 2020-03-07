import { Handbook as _Handbook } from '@handbook/components';
import { useHandbook } from '@handbook/components/context/handbook';
import { Preview as P } from '@handbook/core';
import { blockStyle as insightViewerStyle } from '@lunit/insight-viewer';
import { CodeBlock } from '@lunit/mdx-code-block';
import { blockStyle as componentsStyle, ThemeProvider } from '@lunit/opt-components';
import { SnackbarProvider } from '@ssen/snackbar';
import { Language } from 'prism-react-renderer';
import React, { createElement, CSSProperties } from 'react';
import styled from 'styled-components';

export { HandbookConfig } from '@handbook/components';

export const Handbook = styled(_Handbook)`
  font-size: 14px;
  box-sizing: border-box;

  ${insightViewerStyle};
  ${componentsStyle};
`;

interface Props {
  path: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: CSSProperties;
  preview: P;
}

export function PreviewBase({
  preview: { component, source, filename },
  className,
  style,
  width = '100%',
  height = 300,
}: Props) {
  const { github } = useHandbook();

  return (
    <div className={className} style={style} data-file={filename}>
      <SnackbarProvider>
        <ThemeProvider>
          <div style={{ width, height }}>{createElement(component.default)}</div>
        </ThemeProvider>
      </SnackbarProvider>
      <div>
        <CodeBlock children={source.default} language={filename.split('.').reverse()[0] as Language} />
        {github && (
          <div>
            <a href={`https://github.com/${github.repo}/blob/${github.branch}/${filename}`}>Github</a>
          </div>
        )}
      </div>
    </div>
  );
}

export const Preview = styled(PreviewBase)`
  position: relative;

  > :first-child {
    color: white;
    background-color: #222232;
    overflow: hidden;

    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 3px;
    margin-bottom: 10px;
    padding: 10px;
  }

  > :last-child {
    position: relative;

    > :last-child {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
`;
