import {
  RenderingEngine as CornerstoneRenderingEngine,
  init as initCore,
} from '@cornerstonejs/core';

import { initializeCornerstoneTools } from '../tools';
import { initializeCornerstoneDICOMImageLoader } from './initializeCornerstoneDICOMImageLoader.js';

export const RENDERING_ENGINE_ID = 'cornerstone_rendering_engine_id';

/**
 * Using SINGLETON Pattern
 *
 * See the documentation linked below for the reasons for using the Singleton pattern.
 * https://www.cornerstonejs.org/docs/concepts/cornerstone-core/renderingEngine
 */
export class RenderingEngine extends CornerstoneRenderingEngine {
  private static renderingEngine: CornerstoneRenderingEngine | null = null;
  private static initializingPromise: Promise<void> | null = null;

  private static async initialize() {
    if (!RenderingEngine.initializingPromise) {
      // Start initialisation only if initialisation is not already in progress
      RenderingEngine.initializingPromise = (async () => {
        initializeCornerstoneDICOMImageLoader();
        initializeCornerstoneTools();
        await initCore();

        RenderingEngine.renderingEngine = new CornerstoneRenderingEngine();
      })();
    }

    // Wait for initialisation to complete
    await RenderingEngine.initializingPromise;
  }

  public static async getInstance() {
    if (!RenderingEngine.renderingEngine) {
      await this.initialize();
    }
    return RenderingEngine.renderingEngine;
  }
}
