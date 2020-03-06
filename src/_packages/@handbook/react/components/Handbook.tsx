import { MDXCodeBlock } from '@lunit/mdx-code-block';
import { MDXProvider } from '@mdx-js/react';
import React, { ReactNode } from 'react';
import { HashRouter, Switch } from 'react-router-dom';
import { HandbookProvider } from '../context/handbook';
import { HandbookConfig } from '../types';
import { List } from './List';

interface HandbookProps {
  children: HandbookConfig;
  className?: string;
}

const components = {
  pre: props => <div {...props} />,
  code: MDXCodeBlock,
};

export function Handbook({ children, className }: HandbookProps) {
  const routes: ReactNode[] = [];
  const list = <List node={children.index} routes={routes} />;

  return (
    <HandbookProvider {...children}>
      <HashRouter>
        <div className={className}>
          <nav>{list}</nav>
          <article>
            <MDXProvider components={components}>
              <Switch>{routes}</Switch>
            </MDXProvider>
          </article>
        </div>
      </HashRouter>
    </HandbookProvider>
  );
}
