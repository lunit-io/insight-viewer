import { Enums } from '@cornerstonejs/core';

import { ViewerSlot } from '../ViewerSlot';
import { RenderingEngine } from '../renderEngine';

import type { StackViewport, Image } from './types';

export class RenderingStackViewport extends ViewerSlot {
  private viewportId: string;
  private viewport: StackViewport | null;
  private renderingEngine: RenderingEngine | null;

  constructor(viewportId: string) {
    super();

    this.viewport = null;
    this.viewportId = viewportId;
    this.renderingEngine = null;
  }

  private enableViewportElement = (element: HTMLDivElement) => {
    this.renderingEngine?.enableElement({
      type: Enums.ViewportType.STACK,
      element,
      viewportId: this.viewportId,
    });
  };

  private render = (): void => {
    if (!this.viewport) return;

    this.viewport.render();
  };

  private getViewport = (): StackViewport => {
    return <StackViewport>this.renderingEngine?.getViewport(this.viewportId);
  };

  override destroy = (): void => {
    this.renderingEngine?.disableElement(this.viewportId);
  };

  setViewport = (viewport: StackViewport): void => {
    if (!this.viewport || !this.renderingEngine) return;

    this.viewport = viewport;
    this.render();
  };

  resetViewport = (): void => {
    if (!this.viewport) return;

    this.viewport.resetCamera();
    this.viewport.resetProperties();
  };

  getImage = (): Image => {
    const currentViewport = <StackViewport>(
      this.renderingEngine?.getViewport(this.viewportId)
    );

    return currentViewport.getCornerstoneImage();
  };

  /**
   * This is how to set up multiple images in one Image Viewer
   *
   * @param {Object} imageInfo Fill in the information about the image you are currently setting up.
   * @param {Array} imageInfo.imageIds Insert an array of images in string form. wadouri form is supported.
   * @param {number} imageInfo.currentImageIdIndex Specify the index in the imageIds array that you want to show initially.
   */
  setStack = async ({
    imageIds,
    currentImageIdIndex,
  }: {
    imageIds: Array<string>;
    currentImageIdIndex?: number;
  }): Promise<string | undefined> => {
    if (!this.viewport) return;

    const currentImageId = await this.viewport.setStack(
      imageIds,
      currentImageIdIndex
    );

    return currentImageId;
  };

  init = async (element: HTMLDivElement, imageIds: string[]): Promise<void> => {
    this.renderingEngine = await RenderingEngine.getInstance();
    this.enableViewportElement(element);
    this.viewport = this.getViewport();

    await this.setStack({ imageIds });
    this.render();
  };

  getSnapshot = (): StackViewport | null => {
    return this.getViewport();
  };
}
