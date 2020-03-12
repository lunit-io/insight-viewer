import { Page } from '@handbook/source';
import React, { createElement, ReactElement, ReactNode, useEffect, useState } from 'react';
import { NavLink, Route } from 'react-router-dom';
import slugify from 'slugify';
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

slugify.extend({
  '<': '',
  '>': '',
  '(': '',
  ')': '',
});

export function List({
  node,
  parentPath = '',
  routes,
}: {
  node: HandbookTreeNode;
  parentPath?: string;
  routes: ReactNode[];
}) {
  return (
    <ul>
      {Object.keys(node).map(name => {
        const pathName: string = slugify(name, {
          lower: true,
        });
        const content: HandbookTreeNode | Page = node[name];

        if (isPageContent(content)) {
          routes.push(
            <Route path={`${parentPath}/${pathName}`}>
              <PageLoader content={content} />
            </Route>,
          );
          return (
            <li key={pathName}>
              <NavLink to={`${parentPath}/${pathName}`}>{name}</NavLink>
            </li>
          );
        } else {
          return (
            <li key={pathName}>
              {name}
              <List node={content} parentPath={`${parentPath}/${pathName}`} routes={routes} />
            </li>
          );
        }
      })}
    </ul>
  );
}
