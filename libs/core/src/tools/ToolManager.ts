import {
  ToolGroupManager,
  utilities,
  destroy,
  annotation,
} from '@cornerstonejs/tools';

import { ViewerSlot } from '../ViewerSlot';
import { RenderingEngine } from '../renderEngine';
import {
  DEFAULT_MAPPED_TOOL_WITH_KEY,
  MAPPED_SUPPORT_TOOL,
  SUPPORT_KEYS,
} from './constants';

import type { ToolGroup, MappingToolWithKey, Annotation } from './types';

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

  private getAnnotations = () => {
    return annotation.state.getAllAnnotations();
  };

  private setAnnotations = (
    annotations: Annotation[],
    element: HTMLDivElement
  ) => {
    annotation.state.removeAllAnnotations();

    annotations.forEach((targetAnnotation) => {
      annotation.state.addAnnotation(targetAnnotation, element);
    });
  };

  override destroy = (): void => {
    destroy();
  };

  private setToolPassive = () => {
    const toolGroup = this.toolGroupManager;

    if (!toolGroup) return;

    Object.values(MAPPED_SUPPORT_TOOL).forEach(({ toolName }) => {
      toolGroup.setToolPassive(toolName);
    });
  };

  /**
   * In order to assign a new tool,
   * the previously used tool must be put into passive state.
   * method is responsible for this.
   */
  private updateTool = (mappingToolWithKeys: MappingToolWithKey[] = []) => {
    this.setToolPassive();
    this.setTool(mappingToolWithKeys);
  };

  /**
   * Functions to set the tool you want to use externally and the mouse key you want to map to it.
   * If there is no key to map, assign the default mouse key
   */
  private setTool = (mappingToolWithKeys: MappingToolWithKey[] = []) => {
    const toolGroup = this.toolGroupManager;

    if (!toolGroup) return;

    mappingToolWithKeys.forEach(({ tool, key }) => {
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

  init = async (
    element: HTMLDivElement,
    mappingToolWithKeys?: MappingToolWithKey[]
  ) => {
    this.renderingEngine = await RenderingEngine.getInstance();
    this.addSupportedToolsToCornerstone();
    this.enableToolElement(element);
    this.blockRightClickEvent(element);
    this.mappingRenderingInfoWithToolManager();
    this.updateTool(mappingToolWithKeys);
  };

  getSnapshot = () => {
    return this.getAnnotations();
  };

  setSnapshot = (annotations: Annotation[], element: HTMLDivElement) => {
    this.setAnnotations(annotations, element);
  };
}
