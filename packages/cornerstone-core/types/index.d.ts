export default cornerstone;
import * as colors from './Colors';
import { displayImage, draw, drawInvalidated, invalidate, invalidateImageId, updateImage } from './Drawing';
import { disable, enable } from "./Enable.js";
import { getElementData, removeElementData } from "./EnabledElementData.js";
import { addLayer, getActiveLayer, getLayer, getLayers, getVisibleLayers, purgeLayers, removeLayer, setActiveLayer, setLayerImage } from "./EnabledElementLayers.js";
import { addEnabledElement, getEnabledElement, getEnabledElements, getEnabledElementsByImageId } from "./EnabledElements.js";
import { default as EVENTS, events } from "./events.js";
import { convertImageToFalseColorImage, convertToFalseColorImage, restoreImage } from "./falseColorMapping.js";
import { default as fitToWindow } from "./fitToWindow.js";
import { default as getDefaultViewportForImage } from "./getDefaultViewportForImage.js";
import { default as getImage } from "./getImage.js";
import { default as getPixels } from "./getPixels.js";
import { default as getStoredPixels } from "./getStoredPixels.js";
import * as imageCache from "./imageCache.js";
import { loadAndCacheImage, loadImage, registerImageLoader, registerUnknownImageLoader } from "./ImageLoader.js";
import { default as drawImage } from "./internal/drawImage.js";
import { default as generateLut } from "./internal/generateLut.js";
import { default as getDefaultViewport } from "./internal/getDefaultViewport.js";
import { default as internal } from "./internal/index.js";
import { default as requestAnimationFrame } from "./internal/requestAnimationFrame.js";
import { default as setDefaultViewport } from "./internal/setDefaultViewport.js";
import { default as storedColorPixelDataToCanvasImageData } from "./internal/storedColorPixelDataToCanvasImageData.js";
import { default as storedPixelDataToCanvasImageData } from "./internal/storedPixelDataToCanvasImageData.js";
import { default as storedPixelDataToCanvasImageDataColorLUT } from "./internal/storedPixelDataToCanvasImageDataColorLUT.js";
import { default as storedPixelDataToCanvasImageDataPseudocolorLUT } from "./internal/storedPixelDataToCanvasImageDataPseudocolorLUT.js";
import * as metaData from "./MetaData.js";
import { Image, Viewport } from './Objects';
import { canvasToPixel, pageToPixel, pixelToCanvas } from './PixelCoordinateSystem';
import { default as pixelDataToFalseColorData } from "./pixelDataToFalseColorData.js";
import { default as rendering } from "./rendering/index.js";
import { renderColorImage } from "./rendering/renderColorImage.js";
import { renderGrayscaleImage } from "./rendering/renderGrayscaleImage.js";
import { renderLabelMapImage } from "./rendering/renderLabelMapImage.js";
import { renderPseudoColorImage } from "./rendering/renderPseudoColorImage.js";
import { default as renderToCanvas } from "./rendering/renderToCanvas.js";
import { renderWebImage } from "./rendering/renderWebImage.js";
import { default as reset } from "./reset.js";
import { default as resize } from "./resize.js";
import { default as setToPixelCoordinateSystem } from "./setToPixelCoordinateSystem.js";
import { default as triggerEvent } from "./triggerEvent.js";
import { getViewport, setViewport } from './ViewportSettings';
import { default as webGL } from "./webgl/index.js";

declare namespace cornerstone {
    export { drawImage };
    export { generateLut };
    export { getDefaultViewport };
    export { requestAnimationFrame };
    export { storedPixelDataToCanvasImageData };
    export { storedColorPixelDataToCanvasImageData };
    export { storedPixelDataToCanvasImageDataColorLUT };
    export { storedPixelDataToCanvasImageDataPseudocolorLUT };
    export { internal };
    export { renderLabelMapImage };
    export { renderPseudoColorImage };
    export { renderColorImage };
    export { renderGrayscaleImage };
    export { renderWebImage };
    export { renderToCanvas };
    export { canvasToPixel };
    export { disable };
    export { displayImage };
    export { draw };
    export { drawInvalidated };
    export { enable };
    export { getElementData };
    export { removeElementData };
    export { getEnabledElement };
    export { addEnabledElement };
    export { getEnabledElementsByImageId };
    export { getEnabledElements };
    export { addLayer };
    export { removeLayer };
    export { getLayer };
    export { getLayers };
    export { getVisibleLayers };
    export { setActiveLayer };
    export { getActiveLayer };
    export { purgeLayers };
    export { setLayerImage };
    export { fitToWindow };
    export { getDefaultViewportForImage };
    export { setDefaultViewport };
    export { getImage };
    export { getPixels };
    export { getStoredPixels };
    export { getViewport };
    export { loadImage };
    export { loadAndCacheImage };
    export { registerImageLoader };
    export { registerUnknownImageLoader };
    export { invalidate };
    export { invalidateImageId };
    export { pageToPixel };
    export { pixelToCanvas };
    export { reset };
    export { resize };
    export { setToPixelCoordinateSystem };
    export { setViewport };
    export { updateImage };
    export { pixelDataToFalseColorData };
    export { rendering };
    export { imageCache };
    export { metaData };
    export { webGL };
    export { colors };
    export { convertImageToFalseColorImage };
    export { convertToFalseColorImage };
    export { restoreImage };
    export { EVENTS };
    export { events };
    export { triggerEvent };
    export { Image };
    export { Viewport };
}
export { drawImage,
    generateLut,
    getDefaultViewport,
    setDefaultViewport,
    requestAnimationFrame,
    storedPixelDataToCanvasImageData,
    storedColorPixelDataToCanvasImageData,
    storedPixelDataToCanvasImageDataColorLUT,
    storedPixelDataToCanvasImageDataPseudocolorLUT,
    internal,
    renderLabelMapImage,
    renderPseudoColorImage,
    renderColorImage,
    renderGrayscaleImage,
    renderWebImage,
    renderToCanvas,
    canvasToPixel,
    disable,
    displayImage,
    draw,
    drawInvalidated,
    enable,
    getElementData,
    removeElementData,
    getEnabledElement,
    addEnabledElement,
    getEnabledElementsByImageId,
    getEnabledElements,
    addLayer,
    removeLayer,
    getLayer,
    getLayers,
    getVisibleLayers,
    setActiveLayer,
    getActiveLayer,
    purgeLayers,
    setLayerImage,
    fitToWindow,
    getDefaultViewportForImage,
    getImage,
    getPixels,
    getStoredPixels,
    getViewport,
    loadImage,
    loadAndCacheImage,
    registerImageLoader,
    registerUnknownImageLoader,
    invalidate,
    invalidateImageId,
    pageToPixel,
    pixelToCanvas,
    reset,
    resize,
    setToPixelCoordinateSystem,
    setViewport,
    updateImage,
    pixelDataToFalseColorData,
    rendering,
    imageCache,
    metaData,
    webGL,
    colors,
    convertImageToFalseColorImage,
    convertToFalseColorImage,
    restoreImage,
    EVENTS,
    events,
    triggerEvent,
    Image,
    Viewport };

export as namespace cornerstone;
