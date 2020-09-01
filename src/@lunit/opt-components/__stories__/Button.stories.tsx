import { withInsightViewerStorybookGlobalStyle } from '@lunit/insight-viewer';
import {
  Button,
  ButtonLayout,
  withOPTComponentsStorybookGlobalStyle,
} from '@lunit/opt-components';
import {
  AdjustIcon,
  MagnifyIcon,
  PanIcon,
  PenIcon,
} from '@lunit/opt-control-icons';
import { storiesOf } from '@storybook/react';
import React, { Fragment } from 'react';
import styled from 'styled-components';

const directions = ['vertical', 'horizontal'] as const;

storiesOf('opt-components', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .add('Button', () => (
    <Container>
      {directions.map((direction) => (
        <Fragment key={direction}>
          <div style={{ width: direction === 'vertical' ? 200 : 500 }}>
            <ButtonLayout direction={direction}>
              <Button layout="left" label="PEN" icon={<PenIcon />} />
              <Button layout="left" label="PAN" icon={<PanIcon />} selected />
              <Button layout="left" label="ADJUST" icon={<AdjustIcon />} />
              <Button
                layout="left"
                label="MAGNIFY"
                icon={<MagnifyIcon />}
                disabled
              />
            </ButtonLayout>
          </div>

          <div style={{ width: direction === 'vertical' ? 200 : 330 }}>
            <ButtonLayout direction={direction}>
              <Button layout="center" label="PEN" />
              <Button layout="center" label="PAN" selected />
              <Button layout="center" label="ADJUST" />
              <Button layout="center" label="MAGNIFY" disabled />
            </ButtonLayout>
          </div>

          <div style={{ width: 200 }}>
            <ButtonLayout direction={direction}>
              <Button layout="center" icon={<PenIcon />} />
              <Button layout="center" icon={<PanIcon />} selected />
              <Button layout="center" icon={<AdjustIcon />} />
              <Button layout="center" icon={<MagnifyIcon />} disabled />
            </ButtonLayout>
          </div>

          <div style={{ width: direction === 'vertical' ? 200 : 500 }}>
            <ButtonLayout direction={direction}>
              <Button layout="left" label="PEN" />
              <Button layout="left" label="PAN" selected />
              <Button layout="left" label="ADJUST" />
              <Button layout="left" label="MAGNIFY" disabled />
            </ButtonLayout>
          </div>

          <BlueButtonDiv
            style={{ width: direction === 'vertical' ? 200 : 500 }}
          >
            <ButtonLayout direction={direction}>
              <Button layout="left" label="PEN" icon={<PenIcon />} />
              <Button layout="left" label="PAN" icon={<PanIcon />} selected />
              <Button layout="left" label="ADJUST" icon={<AdjustIcon />} />
              <Button
                layout="left"
                label="MAGNIFY"
                icon={<MagnifyIcon />}
                disabled
              />
            </ButtonLayout>
          </BlueButtonDiv>
        </Fragment>
      ))}
    </Container>
  ));

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;

  > div {
    margin-right: 10px;
    margin-bottom: 10px;
    display: flex;
    flex-flow: column;
    width: 200px;
    padding: 10px;
    background-color: #1e2d47;
  }
`;

const BlueButtonDiv = styled.div`
  --button-background-color: #a892ff;
  --button-label-color: rgba(255, 255, 255, 0.8);
  --button-background-color-hover: #907ae5;
  --button-label-color-hover: rgba(255, 255, 255, 1);
  --button-background-color-selected: #7763bf;
  --button-label-color-selected: rgba(255, 255, 255, 1);
  --button-background-color-disabled: #8b75ca;
  --button-label-color-disabled: rgba(255, 255, 255, 0.2);
`;
