import { MAPPED_SUPPORT_TOOL, SUPPORT_KEYS } from './constants';

import type { Types } from '@cornerstonejs/tools';

type DragMouseEvent = 'primaryDrag' | 'secondaryDrag' | 'wheelDrag';
type WheelMouseEvent = 'wheel';

type DragAction = 'pan' | 'zoom' | 'windowing';
type ScrollAction = 'frame';

type DragTool = {
  [key in DragAction]?: DragMouseEvent;
};
type ScrollTool = {
  [key in ScrollAction]?: WheelMouseEvent;
};
export type Tool = (DragTool & ScrollTool) | null;

export type ToolGroup = Types.IToolGroup;
export type SupportedTool = keyof typeof MAPPED_SUPPORT_TOOL;
export type SupportedKey = keyof typeof SUPPORT_KEYS;
