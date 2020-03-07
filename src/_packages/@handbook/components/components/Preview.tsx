import { Preview as P } from '@handbook/core';
import { CodeBlock } from '@lunit/mdx-code-block';
import { Language } from 'prism-react-renderer';
import React, { createElement, CSSProperties } from 'react';
import styled from 'styled-components';

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
  return (
    <div className={className} style={style} data-file={filename}>
      <div style={{ width, height }}>{createElement(component.default)}</div>
      <CodeBlock children={source.default} language={filename.split('.').reverse()[0] as Language} />
    </div>
  );
}

export const Preview = styled(PreviewBase)`
  position: relative;

  > :first-child {
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 3px;
    margin-bottom: 10px;
    padding: 10px;
  }
`;
