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
      // 초기화가 아직 진행 중이지 않은 경우에만 초기화를 시작
      RenderingEngine.initializingPromise = (async () => {
        initializeCornerstoneDICOMImageLoader();
        initializeCornerstoneTools();
        await initCore();

        RenderingEngine.renderingEngine = new CornerstoneRenderingEngine();
      })();
    }

    // 초기화가 완료될 때까지 기다림
    await RenderingEngine.initializingPromise;
  }

  public static async getInstance() {
    if (!RenderingEngine.renderingEngine) {
      await this.initialize();
    }
    return RenderingEngine.renderingEngine;
  }
}
