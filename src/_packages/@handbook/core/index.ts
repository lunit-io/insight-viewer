import { ComponentType } from 'react';

export interface Page {
  component: () => Promise<{ default: ComponentType }>;
  filename: string;
}

export interface Preview {
  component: { default: ComponentType };
  source: { default: string };
  filename: string;
}

export function page(path: string, content?: Page): Page {
  if (!content) {
    throw new Error(`you have to install @handbook/babel-plugin`);
  }
  return content;
}

export function preview(path: string, content?: Preview): Preview {
  if (!content) {
    throw new Error(`you have to install @handbook/babel-plugin`);
  }
  return content;
}
