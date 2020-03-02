import { withInsightViewerStorybookGlobalStyle } from '@lunit/insight-viewer';
import {
  Button,
  ButtonLayout,
  Panel,
  SessionPanel,
  withOPTComponentsStorybookGlobalStyle,
} from '@lunit/opt-components';
import { AdjustIcon, MagnifyIcon, PanIcon, PenIcon } from '@lunit/opt-control-icons';
import { storiesOf } from '@storybook/react';
import React, { ReactNode, SVGProps } from 'react';
import styled from 'styled-components';

storiesOf('opt-components', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .add('Panel', () => (
    <Container>
      {[200, 250, 300].map(width => (
        <div key={'width-' + width} style={{ width }}>
          <SessionPanel title="TEST" style={{ marginBottom: 6 }} sessionId={'session-panel-' + width}>
            {expanded => (
              <ButtonLayout direction={expanded ? 'vertical' : 'horizontal'}>
                <Button layout={expanded ? 'left' : 'center'} label={expanded ? 'PEN' : undefined} icon={<PenIcon />} />
                <Button
                  layout={expanded ? 'left' : 'center'}
                  label={expanded ? 'PAN' : undefined}
                  icon={<PanIcon />}
                  selected
                />
                <Button
                  layout={expanded ? 'left' : 'center'}
                  label={expanded ? 'ADJUST' : undefined}
                  icon={<AdjustIcon />}
                />
                <Button
                  layout={expanded ? 'left' : 'center'}
                  label={expanded ? 'MAGNIFY' : undefined}
                  icon={<MagnifyIcon />}
                  disabled
                />
              </ButtonLayout>
            )}
          </SessionPanel>

          <Panel title="TEST" style={{ backgroundColor: '#294723' }}>
            <ButtonLayout direction="vertical">
              <Button layout="left" label="PEN" icon={<PenIcon />} />
              <Button layout="left" label="PAN" icon={<PanIcon />} selected />
              <Button layout="left" label="ADJUST" icon={<AdjustIcon />} />
              <Button layout="left" label="MAGNIFY" icon={<MagnifyIcon />} disabled />
            </ButtonLayout>
          </Panel>
        </div>
      ))}

      <LineText x={600} y={15} width={600} height={20} textAnchor="end" stroke="#000000" fill="#ffffff">
        <tspan fill="blue">Hello</tspan> World? <tspan fill="red">Hello</tspan> World?
      </LineText>
    </Container>
  ));

function LineText({
  children,
  width,
  height,
  stroke,
  fill,
  ...props
}: { children: ReactNode } & SVGProps<SVGTextElement>) {
  return (
    <svg width={width} height={height} style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
      <text
        {...props}
        width={width}
        height={height}
        stroke={stroke}
        strokeWidth={5}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {children}
      </text>
      <text {...props} width={width} height={height} fill={fill}>
        {children}
      </text>
    </svg>
  );
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;

  > div {
    margin-right: 10px;
    margin-bottom: 10px;
    background-color: #040a17;
    padding: 10px 0;
    display: flex;
    flex-flow: column;
  }
`;
