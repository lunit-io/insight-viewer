import { StrokeText } from '@lunit/insight-viewer';
import React from 'react';

export default () => (
  <ul style={{ listStyle: 'none' }}>
    <li>
      <StrokeText>
        <text fill="#ffffff">SIMPLE</text>
      </StrokeText>
    </li>
    <li>
      <StrokeText>
        <text>
          <tspan fill="#ffffff">SINGLE</tspan>
          &nbsp; &nbsp;
          <tspan fill="#8694B1">/</tspan>
          &nbsp; &nbsp;
          <tspan fill="#ffffff">TOP</tspan>
        </text>
      </StrokeText>
    </li>
  </ul>
);
