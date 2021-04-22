/* eslint-disable @typescript-eslint/no-var-requires */
const cornerstone = require('cornerstone-core')

export * from './loadImage'

export function init(element: HTMLDivElement): void {
  cornerstone.enable(element)
}
