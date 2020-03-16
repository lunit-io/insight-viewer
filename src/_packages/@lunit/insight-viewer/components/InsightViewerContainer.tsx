import styled from 'styled-components';

export const InsightViewerContainer = styled.div<{ width: number; height: number }>`
  background-color: #000000;
  position: relative;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

export const LeftTopHolder = styled.div`
  position: absolute;
  left: 5px;
  top: 5px;
`;

export const LeftBottomHolder = styled.div`
  position: absolute;
  left: 5px;
  bottom: 5px;
`;

export const RightTopHolder = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
`;

export const RightBottomHolder = styled.div`
  position: absolute;
  right: 5px;
  bottom: 5px;
`;
