import styled from 'styled-components';

export const PanelDescription = styled.p`
  font-size: 12px;
  margin-top: 0;
  color: #ffffff;
  
  > .MuiSvgIcon-root {
    font-size: 16px;
    margin-bottom: 6px;
    display: block;
  }
`;

export const PanelDescriptionTitle = styled.h3`
  font-size: 12px;
  font-weight: normal;
  margin: 5px 0 4px 0;
  color: currentColor;
  
  > .MuiSvgIcon-root {
    font-size: 16px;
    margin-right: 6px;
    transform: translateY(3px);
  }
`;

export const PanelDescriptionColors = {
  NORMAL: '#ffffff',
  INFO: '#00a4c8',
  WARNING: '#d6ae41',
  ERROR: '#c9434b',
};