import { IconButton } from '@material-ui/core';
import { Fullscreen, FullscreenExit } from '@material-ui/icons';
import React, { Children, ReactNode, useState } from 'react';
import styled, { css } from 'styled-components';
import useResizeObserver from 'use-resize-observer/polyfilled';

export interface QuarterViewProps {
  children: ReactNode;
  className?: string;
}

export function QuarterView({ children, className }: QuarterViewProps) {
  const { ref: resizeRef, width = 500, height = 500 } = useResizeObserver<HTMLDivElement>({});
  const [solo, setSolo] = useState<number>(-1);

  const soloEnabled: boolean = solo > -1;

  return (
    <Container ref={resizeRef} soloEnabled={soloEnabled} width={width} height={height} className={className}>
      {Children.map(children, (child, i) => {
        return (
          <Quarter key={'quarter-' + i} soloEnabled={soloEnabled} solo={solo} index={i}>
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
          </Quarter>
        );
      })}
    </Container>
  );
}

const Quarter = styled.div<{ soloEnabled: boolean; solo: number; index: number }>`
  ${({ soloEnabled, solo, index }) => (!soloEnabled || solo === index ? itemStyle : hiddenStyle)};
`;

const Container = styled.div<{ soloEnabled: boolean; width: number; height: number }>`
  ${({ soloEnabled, width, height }) =>
    soloEnabled ? soloContainerStyle : width / height < 1.2 ? gridContainerStyle : verticalContainerStyle};
`;

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
