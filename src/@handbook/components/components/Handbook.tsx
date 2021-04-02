import { MDXCodeBlock } from '@handbook/code-block';
import { MDXProvider } from '@mdx-js/react';
import React, { CSSProperties, ReactNode, useMemo } from 'react';
import { HashRouter, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { HandbookProvider } from '../context/handbook';
import { HandbookConfig } from '../types';
import { List } from './List';

interface HandbookProps {
  config: HandbookConfig;
  className?: string;
  style?: CSSProperties;
}

const components = {
  pre: (props: object) => <div {...props} />,
  code: MDXCodeBlock,
};

export function HandbookBase({ config, className, style }: HandbookProps) {
  const [list, routes] = useMemo<[ReactNode, ReactNode[]]>(() => {
    const routes: ReactNode[] = [];
    const list = <List node={config.index} routes={routes} />;
    return [list, routes];
  }, [config]);

  return (
    <MDXProvider components={components}>
      <HandbookProvider {...config}>
        <HashRouter>
          <div className={className} style={style}>
            <nav>{list}</nav>
            <article>
              <Switch>{routes}</Switch>
            </article>
          </div>
        </HashRouter>
      </HandbookProvider>
    </MDXProvider>
  );
}

export const Handbook = styled(HandbookBase)`
  > nav {
    box-sizing: border-box;
    position: fixed;
    width: 200px;
    height: 100vh;
    padding: 20px;

    overflow-y: auto;

    font-size: 12px;
    line-height: 150%;

    ul {
      margin: 0;
      padding: 0;
      list-style: none;

      ul {
        padding-left: 20px;
      }
    }
  }

  > article {
    box-sizing: border-box;
    margin-left: 200px;
    padding: 20px;
  }
`;
