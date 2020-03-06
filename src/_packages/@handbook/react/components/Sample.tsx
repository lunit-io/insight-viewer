import { FrameProvider, globalStyle as insightViewerGlobaltyle } from '@lunit/insight-viewer';
import { CodeBlock } from '@lunit/mdx-code-block';
import { globalStyle as componentsGlobalStyle, ThemeProvider } from '@lunit/opt-components';
import { jssPreset, StylesProvider } from '@material-ui/styles';
import { create } from 'jss';
import React, {
  ComponentType,
  createElement,
  CSSProperties,
  DetailedHTMLProps,
  ReactNode,
  useEffect,
  useMemo,
  useState,
  IframeHTMLAttributes,
} from 'react';
import { createPortal } from 'react-dom';
import { createGlobalStyle, StyleSheetManager } from 'styled-components';
import { useHandbook } from '../context/handbook';

interface SampleProps {
  path: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: CSSProperties;
  components?: { component: { default: ComponentType }; source: { default: string } };
}

const DefaultSampleWrapper = ({ children }) => children;

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

function IFrame({
  srcdoc,
  children,
  ...iframeProps
}: { srcdoc: string; children: ReactNode } & DetailedHTMLProps<
  IframeHTMLAttributes<HTMLIFrameElement>,
  HTMLIFrameElement
>) {
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
    <iframe ref={setFrame} title="" srcDoc={srcdoc} {...iframeProps}>
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

export function Sample({ components, className, style, width = '100%', height = 300 }: SampleProps) {
  if (!components) {
    throw new Error(`you have to install @handbook/babel-plugin`);
  }

  const {
    sampleTemplate = '<html><head></head><body></body></html>',
    sampleWrapper = DefaultSampleWrapper,
  } = useHandbook();

  return (
    <div className={className} style={style}>
      <IFrame srcdoc={sampleTemplate} width={width} height={height}>
        {createElement(sampleWrapper, {
          children: createElement(components?.component.default),
        })}
      </IFrame>
      <CodeBlock children={components?.source.default} language="tsx" />
    </div>
  );
}
