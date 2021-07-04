type EnableOptions = {
  renderer?: 'webgl'
}
/**
 * Enable an HTML Element for use in Cornerstone
 *
 * - If there is a Canvas already present within the HTMLElement, and it has the class
 * 'cornerstone-canvas', this function will use this existing Canvas instead of creating
 * a new one. This may be helpful when using libraries (e.g. React, Vue) which don't
 * want third parties to change the DOM.
 *
 * @param {HTMLElement} element An HTML Element enabled for Cornerstone
 * @param {Object} options Options for the enabledElement
 *
 * @return {void}
 * @memberof Enable
 */
export default function _default(element: HTMLElement, options?: EnableOptions): void;
