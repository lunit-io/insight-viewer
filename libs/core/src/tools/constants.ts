import {
  PanTool,
  ZoomTool,
  WindowLevelTool,
  StackScrollMouseWheelTool,
  Enums as csToolsEnums,
} from '@cornerstonejs/tools';

/**
 * left: mouse left click
 * right: mouse right click
 * middle: mouse wheel click
 * wheel: mouse wheel
 */
export const SUPPORT_KEYS = {
  left: csToolsEnums.MouseBindings.Primary,
  right: csToolsEnums.MouseBindings.Secondary,
  middle: csToolsEnums.MouseBindings.Auxiliary,
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
  pan: 'middle',
  windowing: 'left',
  frame: 'wheel',
  zoom: 'right',
};
