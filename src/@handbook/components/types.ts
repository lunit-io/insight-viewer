import { SourceModule } from '@handbook/source';
import { ComponentType } from 'react';

export type HandbookTreeNode = {
  [name: string]: HandbookTreeNode | SourceModule<() => Promise<{ default: ComponentType }>>;
};

export interface HandbookConfig {
  github?: {
    repo: string;
    branch?: string;
  };

  vscode?: boolean;

  index: HandbookTreeNode;
}
