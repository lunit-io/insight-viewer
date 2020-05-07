import { lunitDark } from '@lunit/insight-ui';
import styled from 'styled-components';
import { layout } from 'ui-guideline/pages/basic-layout/env';

export const CopyRight = styled.div.attrs({
  children: `Powered by Lunit Inc. ${new Date().getFullYear()}`,
})`
  background-color: ${lunitDark.containers.sidebar.background};
  margin-bottom: 0 !important;
  position: fixed;
  z-index: 1000;
  width: ${layout.sidebarWidth}px;
  right: 0;
  bottom: ${layout.navigationHeight}px;
  height: 48px;
  box-sizing: border-box;
  padding-left: 20px;
  padding-top: 18px;
`;
