#!/usr/bin/env bash
yarn run doc;
rm -rf ./out/handbook/src/*;
mkdir ./out/handbook/src/insight-viewer \
  && mv ./packages/insight-viewer/storybook-static/* ./out/handbook/src/insight-viewer;
mkdir ./out/handbook/src/insight-viewer-demo \
  && mv ./apps/insight-viewer-demo/out/* ./out/handbook/src/insight-viewer-demo;
