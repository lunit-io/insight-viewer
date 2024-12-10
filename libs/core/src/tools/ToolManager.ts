import { ToolGroupManager, utilities, destroy } from '@cornerstonejs/tools';

import { ViewerSlot } from '../ViewerSlot';
import { RenderingEngine } from '../renderEngine';
import { MAPPED_SUPPORT_TOOL, SUPPORT_KEYS } from './constants';

import type { ToolGroup, Tool, SupportedTool } from './types';

export class ToolManager extends ViewerSlot {
  private toolManagerId: string;
  private toolGroupManager: ToolGroup | undefined;
  private renderingEngine: RenderingEngine | null;

  /**
   * @param toolManagerId toolManagerId must be the same as the viewportId you want to assign
   */
  constructor(toolManagerId: string) {
    super();

    this.renderingEngine = null;
    this.toolManagerId = toolManagerId;
    this.toolGroupManager = ToolGroupManager.createToolGroup(toolManagerId);
  }

  /** Added to toolGroupManager by iterating over the supported tools */
  private addSupportedToolsToCornerstone = (): void => {
    const toolGroupManager = this.toolGroupManager;
    if (!toolGroupManager) return;

    for (const [_, tool] of Object.entries(MAPPED_SUPPORT_TOOL)) {
      toolGroupManager.addTool(tool.toolName);
    }
  };

  private mappingRenderingInfoWithToolManager = (): void => {
    const toolGroupManager = this.toolGroupManager;

    if (!toolGroupManager) return;

    toolGroupManager.addViewport(this.toolManagerId, this.renderingEngine?.id);
  };

  private enableToolElement = (element: HTMLDivElement): void => {
    utilities.stackPrefetch.enable(element);
  };

  /** Disable right click context menu so we can have right click tools */
  private blockRightClickEvent = (element: HTMLDivElement) => {
    element.oncontextmenu = (e) => e.preventDefault();
  };

  private isSupportedTool = (key: string): key is SupportedTool => {
    return Object.keys(MAPPED_SUPPORT_TOOL).includes(key);
  };

  override destroy = (): void => {
    destroy();
  };

  /**
   * Functions to set the tool you want to use externally and the mouse key you want to map to it.
   * If there is no key to map, assign the default mouse key
   */
  setTool = (Tool: Tool) => {
    const toolGroup = this.toolGroupManager;

    if (!toolGroup || !Tool) return;

    Object.entries(Tool).forEach(([key, value]) => {
      if (!this.isSupportedTool(key)) return;

      toolGroup.setToolActive(MAPPED_SUPPORT_TOOL[key].toolName, {
        bindings: [
          {
            mouseButton: SUPPORT_KEYS[value],
          },
        ],
      });
    });
  };

  removeAllBindingTool = () => {
    const toolGroup = this.toolGroupManager;

    if (!toolGroup) return;

    Object.entries(MAPPED_SUPPORT_TOOL).forEach(([_, tool]) => {
      toolGroup.setToolPassive(tool.toolName, { removeAllBindings: true });
    });
  };

  init = async (element: HTMLDivElement, Tool: Tool) => {
    this.renderingEngine = await RenderingEngine.getInstance();
    this.addSupportedToolsToCornerstone();
    this.enableToolElement(element);
    this.blockRightClickEvent(element);
    this.mappingRenderingInfoWithToolManager();
    this.setTool(Tool);
  };

  getSnapshot = () => {
    return this.toolGroupManager;
  };

  updateTool = (Tool: Tool) => {
    this.removeAllBindingTool();
    this.setTool(Tool);
  };
}
