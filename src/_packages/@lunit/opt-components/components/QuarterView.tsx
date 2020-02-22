import { IconButton } from '@material-ui/core';
import { Fullscreen, FullscreenExit } from '@material-ui/icons';
import React, { Children, ReactNode, useState } from 'react';
import styled, { css } from 'styled-components';
import useResizeObserver from 'use-resize-observer';

export interface QuarterViewProps {
  children: ReactNode;
  className?: string;
}

export function QuarterView({ children, className }: QuarterViewProps) {
  const { ref: resizeRef, width, height } = useResizeObserver<HTMLDivElement>({
    useDefaults: true,
    defaultWidth: 500,
    defaultHeight: 500,
  });
  const [solo, setSolo] = useState<number>(-1);

  const soloEnabled: boolean = solo > -1;

  return (
    <div
      ref={resizeRef}
      className={className}
      css={`
        ${soloEnabled ? soloContainerStyle : width / height < 1.2 ? gridContainerStyle : verticalContainerStyle}
      `}
    >
      {Children.map(children, (child, i) => {
        return (
          <div
            key={'quarter-' + i}
            css={`
              ${!soloEnabled || solo === i ? itemStyle : hiddenStyle}
            `}
          >
            {child}
            <ExpandButton
              onClick={event => {
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
    </div>
  );
}

const verticalContainerStyle = css`
  display: flex;
  background-color: #1c2331; // line color

  > div {
    flex: 1;

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
`;

const soloContainerStyle = css`
  display: block;
  position: relative;
`;

const itemStyle = css`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const hiddenStyle = css`
  position: absolute;
  left: 100vw;
  top: 0;
  width: 200px;
  height: 300px;
`;

const ExpandButton = styled(IconButton)`
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
`;
