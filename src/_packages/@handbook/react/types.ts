import { ComponentType, ReactNode } from 'react';

export type PageContent = () => Promise<{ default: ComponentType }>;

export type HandbookTreeNode = { [name: string]: HandbookTreeNode | PageContent };

export interface HandbookConfig {
  index: HandbookTreeNode;
  sampleTemplate?: string;
  sampleWrapper?: ComponentType<{ children: ReactNode }>;
}
