import * as cornerstoneTools from '@cornerstonejs/tools';

import { MAPPED_SUPPORT_TOOL } from './constants';

export function initializeCornerstoneTools() {
  cornerstoneTools.init();
  addSupportedToolsToCornerstoneTools();
}

export function addSupportedToolsToCornerstoneTools() {
  for (const [_, tool] of Object.entries(MAPPED_SUPPORT_TOOL)) {
    cornerstoneTools.addTool(tool);
  }
}
