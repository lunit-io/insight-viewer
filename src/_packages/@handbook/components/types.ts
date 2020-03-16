import { Page } from '@handbook/source';

export type HandbookTreeNode = { [name: string]: HandbookTreeNode | Page };

export interface HandbookConfig {
  github?: {
    repo: string;
    branch?: string;
  };

  vscode?: boolean;

  index: HandbookTreeNode;
}
