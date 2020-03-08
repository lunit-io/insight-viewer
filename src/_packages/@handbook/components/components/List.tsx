import { Page } from '@handbook/source';
import React, { createElement, ReactElement, ReactNode, useEffect, useState } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { HandbookTreeNode } from '../types';

function PageLoader({ content }: { content: Page }): ReactElement | null {
  const [element, setElement] = useState<ReactElement | null>(null);

  useEffect(() => {
    content.component().then(({ default: component }) => {
      setElement(createElement(component, {}));
    });
  }, [content]);

  return element;
}

function isPageContent(content: HandbookTreeNode | Page): content is Page {
  return 'component' in content && typeof content.component === 'function';
}

export function List({ node, parent = '', routes }: { node: HandbookTreeNode; parent?: string; routes: ReactNode[] }) {
  return (
    <ul>
      {Object.keys(node).map(name => {
        const content: HandbookTreeNode | Page = node[name];

        if (isPageContent(content)) {
          routes.push(
            <Route path={`${parent}/${name}`}>
              <PageLoader content={content} />
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
