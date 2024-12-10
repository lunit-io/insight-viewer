import { ToolGroupManager, utilities, destroy } from '@cornerstonejs/tools';

import { ViewerSlot } from '../ViewerSlot';
import { RenderingEngine } from '../renderEngine';
import {
  DEFAULT_MAPPED_TOOL_WITH_KEY,
  MAPPED_SUPPORT_TOOL,
  SUPPORT_KEYS,
} from './constants';

import type { ToolGroup, Tool } from './types';

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

  override destroy = (): void => {
    destroy();
  };

  /**
   * Functions to set the tool you want to use externally and the mouse key you want to map to it.
   * If there is no key to map, assign the default mouse key
   */
  setTool = (Tools: Tool[] = []) => {
    const toolGroup = this.toolGroupManager;

    if (!toolGroup) return;

    Tools.forEach(({ tool, key }) => {
      toolGroup.setToolActive(MAPPED_SUPPORT_TOOL[tool].toolName, {
        bindings: [
          {
            mouseButton:
              SUPPORT_KEYS[key ?? DEFAULT_MAPPED_TOOL_WITH_KEY[tool]],
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

  init = async (element: HTMLDivElement, Tools?: Tool[]) => {
    this.renderingEngine = await RenderingEngine.getInstance();
    this.addSupportedToolsToCornerstone();
    this.enableToolElement(element);
    this.blockRightClickEvent(element);
    this.mappingRenderingInfoWithToolManager();
    this.setTool(Tools);
  };

  getSnapshot = () => {
    return this.toolGroupManager;
  };

  updateTool = (Tools: Tool[]) => {
    this.removeAllBindingTool();
    this.setTool(Tools);
  };
}
