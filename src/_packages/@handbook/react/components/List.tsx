import React, { createElement, ReactElement, ReactNode, useEffect, useState } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { HandbookTreeNode, PageContent } from '../types';

function PageContainer({ content }: { content: PageContent }): ReactElement | null {
  const [element, setElement] = useState<ReactElement | null>(null);

  useEffect(() => {
    content().then(({ default: component }) => {
      setElement(createElement(component, {}));
    });
  }, [content]);

  return element;
}

function isPageContent(content: HandbookTreeNode | PageContent): content is PageContent {
  return typeof content === 'function';
}

export function List({ node, parent = '', routes }: { node: HandbookTreeNode; parent?: string; routes: ReactNode[] }) {
  return (
    <ul>
      {Object.keys(node).map(name => {
        const content: HandbookTreeNode | PageContent = node[name];

        if (isPageContent(content)) {
          routes.push(
            <Route path={`${parent}/${name}`}>
              <PageContainer content={content} />
            </Route>,
          );
          return (
            <li key={name}>
              <NavLink to={`${parent}/${name}`}>{name}</NavLink>
            </li>
          );
        } else {
          return (
            <li key={name}>
              {name}
              <List node={content} parent={`${parent}/${name}`} routes={routes} />
            </li>
          );
        }
      })}
    </ul>
  );
}
