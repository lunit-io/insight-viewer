import { PageContent } from '../types';

export function page(path: string, component?: PageContent): PageContent {
  if (!component) {
    throw new Error(`you have to install @handbook/babel-plugin`);
  }
  return component;
}
