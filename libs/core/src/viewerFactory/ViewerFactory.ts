import { v4 as uuidV4 } from 'uuid';

import { Subscribable } from '../Subscribable';
import { ToolManager } from '../tools';
import { RenderingStackViewport } from '../renderViewport';
import { EventHandler } from '../eventHandler';

import type { ToolManagerSnapshot } from '../tools';
import type { StackViewportSnapshot } from '../renderViewport';

export type ViewerStatus = StackViewportSnapshot & ToolManagerSnapshot;

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
    const toolManagerSnapshot = this.ToolManager.getSnapshot();

    if (!renderingStackViewportSnapshot || !toolManagerSnapshot) return;

    const { viewport, image } = renderingStackViewportSnapshot;
    const { tool } = toolManagerSnapshot;

    this.snapshot = {
      viewport,
      image,
      tool,
    };
  };

  protected override onUnsubscribe = (): void => {
    this.ToolManager.destroy();
    this.RenderingStackViewport.destroy();
  };

  init = async ({
    element,
    imageIds,
    viewerStatus,
    imageRenderEventCallback,
  }: {
    element: HTMLDivElement;
    imageIds: string[];
    viewerStatus: ViewerSnapshot;
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
    await this.ToolManager.init(element, viewerStatus?.tool ?? null);

    this.emitChange();
  };

  updateSnapshot = (viewerStatus: ViewerStatus) => {
    if (!viewerStatus) return;

    this.RenderingStackViewport.setViewport(viewerStatus);
    this.ToolManager.setTool(viewerStatus?.tool ?? null);
  };
}
