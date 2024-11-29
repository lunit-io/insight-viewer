import { v4 as uuidV4 } from 'uuid';

import { Subscribable } from '../Subscribable';
import { ToolManager } from '../tools';
import { RenderingStackViewport } from '../renderViewport';
import { EventHandler } from '../eventHandler';

import type { MappingToolWithKey } from '../tools';
import type { StackViewportSnapshot } from '../renderViewport';

export type ViewerStatus = {
  viewport: StackViewportSnapshot;
};

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
    const viewport = this.RenderingStackViewport.getSnapshot();

    if (!viewport) return;

    this.snapshot = {
      viewport,
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
    viewportChangeEventCallback,
    stackNewStackEventCallback,
  }: {
    element: HTMLDivElement;
    imageIds: string[];
    tools?: MappingToolWithKey[];
    imageRenderEventCallback?: (viewerInfo: ViewerSnapshot) => void;
    viewportChangeEventCallback?: (viewerInfo: ViewerSnapshot) => void;
    stackNewStackEventCallback?: (viewerInfo: ViewerSnapshot) => void;
  }) => {
    this.EventHandler.init({
      element,
      imageRenderCallback: () => {
        this.setSnapshot();
        imageRenderEventCallback?.(this.snapshot);
        viewportChangeEventCallback?.(this.snapshot);
      },
      stackNewStackCallback: () => {
        this.setSnapshot();
        stackNewStackEventCallback?.(this.snapshot);
      },
    });

    await this.RenderingStackViewport.init(element, imageIds);
    await this.ToolManager.init(element, tools);

    this.emitChange();
  };

  updateSnapshot = (viewerInfo: ViewerStatus) => {
    if (!viewerInfo) return;

    this.RenderingStackViewport.setViewport(viewerInfo.viewport);
  };
}
