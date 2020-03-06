import { CodeBlock } from '@lunit/mdx-code-block';
import React, { ComponentType, createElement, CSSProperties } from 'react';
import { useHandbook } from '../context/handbook';

interface SampleProps {
  path: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: CSSProperties;
  components?: { component: { default: ComponentType }; source: { default: string } };
}

const defaultTemplate = `<html><head></head><body></body></html>`;
const DefaultIFrame = props => <iframe {...props} />;

export function Sample({ components, className, style, width = '100%', height = 300 }: SampleProps) {
  if (!components) {
    throw new Error(`you have to install @handbook/babel-plugin`);
  }

  const { template = defaultTemplate, components: _components } = useHandbook();
  const { IFrame = DefaultIFrame } = _components || {};

  return (
    <div className={className} style={style}>
      {createElement(IFrame, {
        srcDoc: template,
        width,
        height,
        children: createElement(components?.component.default),
      })}
      <CodeBlock children={components?.source.default} language="tsx" />
    </div>
  );
}
