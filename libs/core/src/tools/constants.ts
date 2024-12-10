import {
  PanTool,
  ZoomTool,
  WindowLevelTool,
  StackScrollMouseWheelTool,
  Enums as csToolsEnums,
} from '@cornerstonejs/tools';

export const SUPPORT_KEYS = {
  primaryDrag: csToolsEnums.MouseBindings.Primary,
  secondaryDrag: csToolsEnums.MouseBindings.Secondary,
  wheelDrag: csToolsEnums.MouseBindings.Auxiliary,
  // TODO: Cornerstone 3D 에서 Wheel 커스텀 방식 체크, 아래는 임시 타입
  wheel: csToolsEnums.MouseBindings.Fourth_Button,
};

export const MAPPED_SUPPORT_TOOL = {
  pan: PanTool,
  zoom: ZoomTool,
  windowing: WindowLevelTool,
  frame: StackScrollMouseWheelTool,
};

export const DEFAULT_MAPPED_TOOL_WITH_KEY: Record<
  keyof typeof MAPPED_SUPPORT_TOOL,
  keyof typeof SUPPORT_KEYS
> = {
  pan: 'wheelDrag',
  windowing: 'primaryDrag',
  frame: 'wheel',
  zoom: 'secondaryDrag',
};
