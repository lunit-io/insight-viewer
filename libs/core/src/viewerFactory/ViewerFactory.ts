import { v4 as uuidV4 } from 'uuid';

import { Subscribable } from '../Subscribable';
import { ToolManager } from '../tools';
import { RenderingStackViewport } from '../renderViewport';
import { EventHandler } from '../eventHandler';

import type { MappingToolWithKey } from '../tools';
import type { StackViewportSnapshot } from '../renderViewport';

export type ViewerStatus = StackViewportSnapshot;

export type ViewerSnapshot = ViewerStatus | null;

// TODO: Need to refactor common behaviours like subscribe
export class ViewerFactory extends Subscribable<ViewerSnapshot> {
  private viewerId: string;
  private ToolManager: ToolManager;
  private RenderingStackViewport: RenderingStackViewport;
  private EventHandler: EventHandler;
  protected snapshot: ViewerSnapshot;

  constructor() {
    super();

    this.viewerId = uuidV4();
    this.EventHandler = new EventHandler();
    this.ToolManager = new ToolManager(this.viewerId);
    this.RenderingStackViewport = new RenderingStackViewport(this.viewerId);

    /**
     * The reason for specifying snapshot separately is that
     * if you export the same type of object from getSnapshot,
     * the useSyncExternalStore hook will cause
     * an infinite rendering bug in the useSyncExternalStore hook.
     *
     * Docs: https://react.dev/reference/react/useSyncExternalStore#im-getting-an-error-the-result-of-getsnapshot-should-be-cached
     */
    this.snapshot = null;
  }

  protected override setSnapshot = () => {
    const renderingStackViewportSnapshot =
      this.RenderingStackViewport.getSnapshot();

    if (!renderingStackViewportSnapshot) return;

    const { viewport, image } = renderingStackViewportSnapshot;

    this.snapshot = {
      viewport,
      image,
    };
  };

  protected override onUnsubscribe = (): void => {
    this.ToolManager.destroy();
    this.RenderingStackViewport.destroy();
  };

  init = async ({
    element,
    imageIds,
    tools,
    imageRenderEventCallback,
  }: {
    element: HTMLDivElement;
    imageIds: string[];
    tools?: MappingToolWithKey[];
    imageRenderEventCallback?: (viewerStatus: ViewerSnapshot) => void;
  }) => {
    this.EventHandler.init({
      element,
      imageRenderCallback: () => {
        this.setSnapshot();
        imageRenderEventCallback?.(this.snapshot);
      },
    });

    await this.RenderingStackViewport.init(element, imageIds);
    await this.ToolManager.init(element, tools);

    this.emitChange();
  };

  updateSnapshot = (viewerStatus: ViewerStatus) => {
    if (!viewerStatus) return;

    this.RenderingStackViewport.setViewport(viewerStatus);
  };

  updateViewerSetting = (tools: MappingToolWithKey[]) => {
    if (!this.snapshot) return;

    this.ToolManager.updateTool(tools);
  };
}
