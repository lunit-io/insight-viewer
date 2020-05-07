import { lunitDark, ScreenFitContainer } from '@lunit/insight-ui';
import React from 'react';
import styled from 'styled-components';
import { HeaderLogo } from 'ui-guideline/pages/basic-layout/components/HeaderLogo';
import { Indicator } from 'ui-guideline/pages/basic-layout/components/Indicator';
import { SideBar } from 'ui-guideline/pages/basic-layout/components/SideBar';
import { layout } from 'ui-guideline/pages/basic-layout/env';

export default function () {
  return (
    <Container>
      <Header>
        <div>
          <HeaderLogo />
          <Indicator threshold={0.1} />
        </div>
        <div></div>
      </Header>

      <Main>
        <View></View>

        <SideBar sessionId={''} />
      </Main>
    </Container>
  );
}

const Container = styled(ScreenFitContainer)`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background: ${lunitDark.containers.body.background};
  height: 50px;
  min-height: 50px;
  max-height: 50px;

  padding: 0;
  font-size: 14px;

  display: flex;

  > :first-child {
    box-sizing: border-box;
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
  }

  > :last-child {
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: ${layout.sidebarWidth}px;
    padding-right: 20px;
  }
`;

const Main = styled.div`
  min-height: 0;
  flex: 1;
  display: flex;
  flex-direction: row;
`;

const View = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
  background-color: #000000;
`;
