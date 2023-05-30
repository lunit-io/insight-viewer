# INSIGHT Viewer

Insight Viewer is a library that [Cornerstone.js](https://github.com/cornerstonejs/cornerstone) medical image viewer component for React.

- **Dicom Viewer**: Allows you to represent dicom image files in React.

- **Dicom Viewport handling**: You can control the Dicom viewport declaratively.

- **Drawing Annotation**: Supports the ability to draw annotations on Dicom images. <br />
  This allows you to visually represent the location of a lesion.

## Install

The insight viewer library is registered on NPM, so you can install and use it.

- [@lunit/insight-viewer NPM](https://www.npmjs.com/package/@lunit/insight-viewer)

## Docs

You can see what features are supported and example code to use them.

- [https://insight-viewer.lunit.io/](https://insight-viewer.lunit.io/)

## Project structure

- [`libs`](./libs) - Importable libraries.
- [`apps`](./apps) - Applications that use libraries

### Packages

You can check out the library code deployed on NPM.

- [`libs/insight-viewer`](./libs/insight-viewer) - Cornerstone.js medical image viewer component for React.

### Testing Docs

You can view documents created with the INSIGHT Viewer library.

- [`apps/insight-viewer-dev`](./apps/insight-viewer-dev) - Documentation site for @lunit/insight-viewer.

## Development

Clone this repository locally `$ git clone git@github.com:lunit-io/insight-viewer.git`

```sh
$ npm i
$ npm install -g nx
$ npm start // serve docs on http://localhost:4200
```
