import { ComponentType } from 'react';

export interface Page {
  component: () => Promise<{ default: ComponentType }>;
  filename: string;
}

export interface Example {
  component?: { default: ComponentType };
  source: { default: string };
  filename: string;
}

export function page(path: string, content?: Page): Page {
  if (!content) {
    throw new Error(`Can't find the content of the "${path}". You have to install @handbook/babel-plugin`);
  }
  return content;
}

export function component(path: string, content?: Example): Example {
  if (!content) {
    throw new Error(`Can't find the content of the "${path}". You have to install @handbook/babel-plugin`);
  }
  return content;
}

export function source(path: string, content?: Example): Example {
  if (!content) {
    throw new Error(`Can't find the content of the "${path}". You have to install @handbook/babel-plugin`);
  }
  return content;
}

export * from './transpile/api';
