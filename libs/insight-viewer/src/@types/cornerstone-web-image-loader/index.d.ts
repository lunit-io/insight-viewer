declare type Cornerstone = typeof import('cornerstone-core').default

declare module 'cornerstone-web-image-loader' {
  const external: {
    cornerstone: Cornerstone
  }

  export { external }
}
