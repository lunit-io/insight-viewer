import { DecoratorFunction } from '@storybook/addons';
import React, { createElement, isValidElement } from 'react';
import { createGlobalStyle } from 'styled-components';
import { globalStyle } from './style';

const StorybookGlobalStyle = createGlobalStyle`
  html {
    font-size: 14px;
    box-sizing: border-box;
  }
  
  ${globalStyle}
`;

//tslint:disable-next-line:no-any
export const withInsightViewerStorybookGlobalStyle: DecoratorFunction<any> = storyFn => {
  const story = storyFn();

  return (
    <>
      <StorybookGlobalStyle />
      {typeof story === 'function' ? (
        createElement(story)
      ) : isValidElement(story) ? (
        story
      ) : (
        <div>story is not valid element</div>
      )}
    </>
  );
};
