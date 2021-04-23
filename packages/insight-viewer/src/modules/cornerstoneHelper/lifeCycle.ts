/* eslint-disable @typescript-eslint/no-var-requires */
const cornerstone = require('cornerstone-core')

export function init(element: HTMLDivElement): void {
  cornerstone.enable(element)
}

export function dispose(element: HTMLDivElement): void {
  cornerstone.disable(element)
}
