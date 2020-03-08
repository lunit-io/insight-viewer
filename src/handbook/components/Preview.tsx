import { FrameProvider, globalStyle as insightViewerGlobaltyle } from '@lunit/insight-viewer';
import { globalStyle as componentsGlobalStyle, ThemeProvider } from '@lunit/opt-components';
import { jssPreset, StylesProvider } from '@material-ui/styles';
import { create } from 'jss';
import React, { DetailedHTMLProps, IframeHTMLAttributes, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { createGlobalStyle, StyleSheetManager } from 'styled-components';

export const SampleGlobalStyle = createGlobalStyle`
  ${componentsGlobalStyle};
  ${insightViewerGlobaltyle};
  
  html {
    font-size: 14px;
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 20px;
  }
`;

const template = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#222232" />
    <link rel="shortcut icon" href="favicon.ico" />
    <link rel="manifest" href="manifest.json" />
    <title>API</title>
    <script src="cornerstone.js"></script>
    <script src="cornerstoneWADOImageLoader.js"></script>
    <script src="cornerstoneWebImageLoader.js"></script>
    <script src="dicomParser.js"></script>
    <link rel="stylesheet" href="fonts/proximanova/proximanova.css" />
  </head>

  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="app"></div>
  </body>
</html>
`;

function IFrame({
  children,
  ...iframeProps
}: DetailedHTMLProps<IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>) {
  const [frame, setFrame] = useState<HTMLIFrameElement | null>(null);
  const [contentWindow, setContentWindow] = useState<Window | null>(null);
  const sheetsManager = useMemo(() => new Map(), []);
  const jssInstance = useMemo(() => {
    return contentWindow
      ? create({ plugins: jssPreset().plugins, insertionPoint: contentWindow.document?.body })
      : null;
  }, [contentWindow]);

  useEffect(() => {
    function update() {
      setContentWindow(frame?.contentWindow || window);
    }

    frame?.addEventListener('load', update);

    return () => {
      frame?.removeEventListener('load', update);
    };
  }, [frame]);

  return (
    <iframe {...iframeProps} ref={setFrame}>
      {contentWindow &&
        children &&
        jssInstance &&
        createPortal(
          <FrameProvider frame={frame || undefined} contentWindow={contentWindow}>
            <StylesProvider jss={jssInstance} sheetsManager={sheetsManager}>
              <StyleSheetManager target={contentWindow.document.head}>
                <ThemeProvider injectFirst={false}>
                  <SampleGlobalStyle />
                  {children}
                </ThemeProvider>
              </StyleSheetManager>
            </StylesProvider>
          </FrameProvider>,
          contentWindow.document.body.querySelector('#app')!,
        )}
    </iframe>
  );
}
