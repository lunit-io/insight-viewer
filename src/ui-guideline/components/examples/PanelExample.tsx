import { useSnackbar } from '@ssen/snackbar';
import React, { ReactNode, useMemo } from 'react';
import styled from 'styled-components';
import { sidebarWidth } from '../../env';
import { SideBar } from '../sidebar/SideBar';

interface ChildProps {
  viewerWidth: number;
}

export interface PanelExampleProps {
  width: number;
  height: number;
  children: (childProps: ChildProps) => { viewer?: ReactNode; sidepanel?: ReactNode };
}

export function PanelExample({ width, height, children }: PanelExampleProps) {
  const { snackbarContainer } = useSnackbar();

  const viewerWidth: number = useMemo(() => {
    return width - sidebarWidth;
  }, [width]);

  const childProps = useMemo<ChildProps>(
    () => ({
      viewerWidth,
    }),
    [viewerWidth],
  );

  const { viewer, sidepanel } = children(childProps);

  return (
    <div
      style={{
        display: 'flex',
        width,
        height,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: viewerWidth,
          height,
          backgroundColor: '#000000',
        }}
      >
        {viewer}

        <SnackbarContainer ref={snackbarContainer} />
      </div>
      <SideBar sessionId={Date.now().toString()} width={sidebarWidth}>
        {sidepanel}
      </SideBar>
    </div>
  );
}

const SnackbarContainer = styled.div`
  position: absolute;
  right: 10px;
  bottom: 10px;
  display: flex;
  flex-direction: column-reverse;
  justify-content: right;
  align-items: flex-end;

  > * {
    margin-top: 10px;
  }
`;
