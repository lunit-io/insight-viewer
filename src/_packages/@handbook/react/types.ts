import { ComponentType, DetailedHTMLProps, IframeHTMLAttributes } from 'react';

export type PageContent = () => Promise<{ default: ComponentType }>;

export type HandbookTreeNode = { [name: string]: HandbookTreeNode | PageContent };

export interface HandbookConfig {
  github?: {
    repo: string;
    branch?: string;
  };

  vscode?: boolean;

  index: HandbookTreeNode;

  template?: string;

  components?: {
    IFrame?: ComponentType<DetailedHTMLProps<IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>>;
  };
}
