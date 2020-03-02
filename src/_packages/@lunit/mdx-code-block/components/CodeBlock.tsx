import { Language } from 'prism-react-renderer';
import React from 'react';
import { MDXCodeBlock } from './MDXCodeBlock';

export interface CodeBlockProps {
  children: string;
  language: Language;
}

export function CodeBlock({ children, language }: CodeBlockProps) {
  return <MDXCodeBlock className={`language-${language}`}>{children}</MDXCodeBlock>;
}
