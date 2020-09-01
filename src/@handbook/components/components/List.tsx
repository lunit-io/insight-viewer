import { SourceModule } from '@handbook/source';
import React, {
  ComponentType,
  createElement,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { NavLink, Route } from 'react-router-dom';
import slugify from 'slugify';
import { HandbookTreeNode } from '../types';

function PageLoader({
  content,
}: {
  content: SourceModule<() => Promise<{ default: ComponentType }>>;
}): ReactElement | null {
  const [element, setElement] = useState<ReactElement | null>(null);

  useEffect(() => {
    content.module().then(({ default: component }) => {
      setElement(createElement(component, {}));
    });
  }, [content]);

  return element;
}

function isPageContent(
  content:
    | HandbookTreeNode
    | SourceModule<() => Promise<{ default: ComponentType }>>,
): content is SourceModule<() => Promise<{ default: ComponentType }>> {
  return 'module' in content && typeof content.module === 'function';
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
      {Object.keys(node).map((name) => {
        const pathName: string = slugify(name, {
          lower: true,
        });
        const content:
          | HandbookTreeNode
          | SourceModule<() => Promise<{ default: ComponentType }>> =
          node[name];

        if (isPageContent(content)) {
          routes.push(
            <Route path={`${parentPath}/${pathName}`}>
              <PageLoader content={content} />
            </Route>,
          );
          return (
            <li key={pathName}>
              <NavLink
                to={`${parentPath}/${pathName}`}
                onClick={() => (document.documentElement.scrollTop = 0)}
              >
                {name}
              </NavLink>
            </li>
          );
        } else {
          return (
            <li key={pathName}>
              {name}
              <List
                node={content}
                parentPath={`${parentPath}/${pathName}`}
                routes={routes}
              />
            </li>
          );
        }
      })}
    </ul>
  );
}
