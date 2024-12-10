import { MAPPED_SUPPORT_TOOL, SUPPORT_KEYS } from './constants';

import type { Types } from '@cornerstonejs/tools';

export type ToolGroup = Types.IToolGroup;
export type SupportedTool = keyof typeof MAPPED_SUPPORT_TOOL;
export type SupportedKey = keyof typeof SUPPORT_KEYS;
export type Tool = {
  tool: SupportedTool;
  key?: SupportedKey;
};
