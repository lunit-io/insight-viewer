import { css, keyframes } from 'styled-components';

const dash = keyframes`
  to {
    stroke-dashoffset: 0;
  }
`;

export const dashStroke = css`
  stroke-dasharray: 10,10;
  stroke-dashoffset: 1000;
  animation: ${dash} 10s linear infinite;
`;
