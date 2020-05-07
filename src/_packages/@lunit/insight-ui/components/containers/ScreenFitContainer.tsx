import { isTouchDevice } from '@lunit/is-touch-device';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { useWindowSize } from '../layout/useWindowSize';

function ResizeWatchContainer({ style, ...props }: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  const [, windowHeight] = useWindowSize();
  return <div {...props} style={{ ...style, width: '100vw', height: windowHeight }} />;
}

function ViewportSizeContainer({ style, ...props }: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return <div {...props} style={{ ...style, width: '100vw', height: '100vh' }} />;
}

export function ScreenFitContainer(props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return isTouchDevice() ? <ResizeWatchContainer {...props} /> : <ViewportSizeContainer {...props} />;
}
