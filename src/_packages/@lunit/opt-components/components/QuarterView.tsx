import { IconButton } from '@material-ui/core';
import { Fullscreen, FullscreenExit } from '@material-ui/icons';
import React, { Children, ReactNode, useState } from 'react';
import styled, { css } from 'styled-components';
import useResizeObserver from 'use-resize-observer/polyfilled';
import { useShortcut, key } from '@lunit/use-shortcut';

export interface QuarterViewProps {
  children: ReactNode;
  className?: string;
  shortcuts?: string[];
}

export function QuarterView({ children, className, shortcuts = ['', '', '', ''] }: QuarterViewProps) {
  const { ref: resizeRef, width = 500, height = 500 } = useResizeObserver<HTMLDivElement>({});
  const [solo, setSolo] = useState<number>(-1);

  const soloEnabled: boolean = solo > -1;

  useShortcut({
    test: key(shortcuts[0] || ''),
    callback: () => setSoloShortcut(0),
  });

  useShortcut({
    test: key(shortcuts[1] || ''),
    callback: () => setSoloShortcut(1),
  });

  useShortcut({
    test: key(shortcuts[2] || ''),
    callback: () => setSoloShortcut(2),
  });

  useShortcut({
    test: key(shortcuts[3] || ''),
    callback: () => setSoloShortcut(3),
  });

  function setSoloShortcut(index: number) {
    if (Children.count(children) > index) {
      if (solo > -1) {
        setSolo(-1);
      } else {
        setSolo(index);
      }
    }
  }

  return (
    <Container ref={resizeRef} soloEnabled={soloEnabled} width={width} height={height} className={className}>
      {Children.map(children, (child, i) => {
        return (
          <div key={'quarter-' + i} data-solo={solo === i}>
            {child}
            <ExpandButton
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                event.nativeEvent.stopImmediatePropagation();
                setSolo(soloEnabled ? -1 : i);
              }}
            >
              {soloEnabled ? <FullscreenExit /> : <Fullscreen />}
            </ExpandButton>
          </div>
        );
      })}
    </Container>
  );
}

const Container = styled.div<{ soloEnabled: boolean; width: number; height: number }>`
  ${({ soloEnabled, width, height }) =>
    soloEnabled ? soloContainerStyle : width / height < 1.2 ? gridContainerStyle : verticalContainerStyle};
`;

const verticalContainerStyle = css`
  display: flex;
  background-color: #1c2331; // line color

  > div {
    flex: 1;

    position: relative;
    overflow: hidden;

    &:not(:last-of-type) {
      margin-right: 1px;
    }
  }
`;

const gridContainerStyle = css`
  display: grid;
  background-color: #1c2331; // line color

  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 1px;

  > div {
    position: relative;
    overflow: hidden;
  }
`;

const soloContainerStyle = css`
  display: block;
  position: relative;

  > div[data-solo='true'] {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  > div[data-solo='false'] {
    position: absolute;
    left: 100vw;
    top: 0;
    width: 200px;
    height: 300px;
  }
`;

const ExpandButton = styled(IconButton)`
  && {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 0;
    padding: 4px 6px;
    color: #8694b1;
    font-size: 18px;

    .MuiSvgIcon-root {
      font-size: 1em;
    }
  }
`;
