import type { Types } from '@cornerstonejs/core';

export type StackViewport = Types.IStackViewport;
export type Image = Types.IImage;
export type StackViewportProperties = Types.StackViewportProperties;
export type Camera = Types.ICamera;

export interface StackViewportSnapshot {
  viewport?: {
    properties?: StackViewportProperties;
    camera?: Camera;
  };
  image?: Image;
}
