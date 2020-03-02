# Use

## Config

```tsx
import React from 'react';
import { GlobalStyle } from '@lunit/opt-components';

function App() {
  return (
    <div>
      <GlobalStyle />
      {/* Contents */}
    </div>
  )
}
```

or

```tsx
import React from 'react';
import { globalStyle } from '@lunit/opt-components';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  ${globalStyle}

  html {
    font-size: 14px;
    box-sizing: border-box;
  }
`;

function App() {
  return (
    <div>
      <GlobalStyle />
      {/* Contents */}
    </div>
  )
}
```

## Config Storybook

```tsx
import { withStorybookGlobalStyle } from '@lunit/opt-components';
import { storiesOf } from '@storybook/react';
import React from 'react';

storiesOf('Theme', module)
  .addDecorator(withStorybookGlobalStyle)
  .add('Test', () => <div>TODO</div>);
```

# Samples

<!-- import **/*.stories.{ts,tsx} --title-tag h3 -->

### \_\_stories\_\_/Button.stories.tsx


```tsx
import { withInsightViewerStorybookGlobalStyle } from '@lunit/insight-viewer';
import { Button, ButtonLayout, withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { AdjustIcon, MagnifyIcon, PanIcon, PenIcon } from '@lunit/opt-control-icons';
import { storiesOf } from '@storybook/react';
import React, { Fragment } from 'react';
import styled from 'styled-components';

const directions = ['vertical', 'horizontal'] as const;

storiesOf('opt-components', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .add('Button', () => (
    <Container>
      {directions.map(direction => (
        <Fragment key={direction}>
          <div style={{ width: direction === 'vertical' ? 200 : 500 }}>
            <ButtonLayout direction={direction}>
              <Button layout="left" label="PEN" icon={<PenIcon />} />
              <Button layout="left" label="PAN" icon={<PanIcon />} selected />
              <Button layout="left" label="ADJUST" icon={<AdjustIcon />} />
              <Button layout="left" label="MAGNIFY" icon={<MagnifyIcon />} disabled />
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

          <BlueButtonDiv style={{ width: direction === 'vertical' ? 200 : 500 }}>
            <ButtonLayout direction={direction}>
              <Button layout="left" label="PEN" icon={<PenIcon />} />
              <Button layout="left" label="PAN" icon={<PanIcon />} selected />
              <Button layout="left" label="ADJUST" icon={<AdjustIcon />} />
              <Button layout="left" label="MAGNIFY" icon={<MagnifyIcon />} disabled />
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

```


### \_\_stories\_\_/DialogPaper.stories.tsx


```tsx
import { withInsightViewerStorybookGlobalStyle } from '@lunit/insight-viewer';
import { DialogPaper, Button, withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import React, { useState } from 'react';
import { Modal } from '@material-ui/core';
import styled from 'styled-components';

export default {
  title: 'opt-components',
  component: DialogPaper,
  decorators: [withOPTComponentsStorybookGlobalStyle, withInsightViewerStorybookGlobalStyle],
};

export const DialogPaperSample = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(true);

  return (
    <>
      <CenterModal open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogPaper>
          <p>Hello World</p>

          <div style={{ marginTop: 17 }}>
            <Button onClick={() => setModalOpen(false)} style={{ width: 130 }} layout="center" label="CLOSE" />
          </div>
        </DialogPaper>
      </CenterModal>
      {!modalOpen && <Button onClick={() => setModalOpen(true)} style={{ width: 100 }} layout="center" label="show" />}
    </>
  );
};

const CenterModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

DialogPaperSample.story = {
  name: 'DialogPaper',
};

```


### \_\_stories\_\_/Panel.stories.tsx


```tsx
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

```


### \_\_stories\_\_/Slider.stories.tsx


```tsx
import { withInsightViewerStorybookGlobalStyle } from '@lunit/insight-viewer';
import { Slider, withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

storiesOf('opt-components', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .add('Slider', () => (
    <div style={{ width: 300, margin: 20 }}>
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: '10px 30px' }}>
        <Slider defaultValue={50} />
      </div>

      <div style={{ backgroundColor: 'rgba(255, 255, 255, 1)', padding: '10px 30px' }}>
        <BlueSlider defaultValue={50} />
      </div>
    </div>
  ));

export const BlueSlider = styled(Slider)`
  --slider-rail-color: rgba(86, 81, 136, 0.4);
  --slider-thumb-color: #6b6b9b;
  --slider-track-color: rgba(86, 81, 136, 0.6);
  --slider-value-label-color: #ffffff;
`;

```


### \_\_stories\_\_/Snackbar.stories.tsx


```tsx
import { withInsightViewerStorybookGlobalStyle } from '@lunit/insight-viewer';
import {
  ErrorSnackbarContent,
  InfoSnackbarContent,
  NormalSnackbarContent,
  SnackbarContent,
  WarningSnackbarContent,
  withOPTComponentsStorybookGlobalStyle,
} from '@lunit/opt-components';
import { Button, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Snackbar, SnackbarProvider, useSnackbar } from '@ssen/snackbar';
import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

let count: number = 0;

function Basic() {
  const { addSnackbar, snackbarContainer } = useSnackbar();

  return (
    <Container>
      <button
        onClick={() => {
          count++;

          addSnackbar(
            <Snackbar autoClose={false}>
              <SnackbarContent
                message={`${count} HELLO SNACKBAR!`}
                action={[
                  <Button key="undo" color="inherit" size="small">
                    UNDO
                  </Button>,
                  <IconButton key="close" aria-label="close" color="inherit">
                    <Close />
                  </IconButton>,
                ]}
              />
            </Snackbar>,
          );
        }}
      >
        Default
      </button>

      <button
        onClick={() => {
          count++;

          addSnackbar(
            <Snackbar autoClose={false}>
              <NormalSnackbarContent
                message={`${count} HELLO SNACKBAR!`}
                action={[
                  <Button key="undo" color="inherit" size="small">
                    UNDO
                  </Button>,
                  <IconButton key="close" aria-label="close" color="inherit">
                    <Close />
                  </IconButton>,
                ]}
              />
            </Snackbar>,
          );
        }}
      >
        Normal
      </button>

      <button
        onClick={() => {
          count++;

          addSnackbar(
            <Snackbar autoClose={false}>
              <InfoSnackbarContent
                message={`${count} HELLO SNACKBAR!`}
                action={[
                  <Button key="undo" color="inherit" size="small">
                    UNDO
                  </Button>,
                  <IconButton key="close" aria-label="close" color="inherit">
                    <Close />
                  </IconButton>,
                ]}
              />
            </Snackbar>,
          );
        }}
      >
        Info
      </button>

      <button
        onClick={() => {
          count++;

          addSnackbar(
            <Snackbar autoClose={false}>
              <WarningSnackbarContent
                message={`${count} HELLO SNACKBAR!`}
                action={[
                  <Button key="undo" color="inherit" size="small">
                    UNDO
                  </Button>,
                  <IconButton key="close" aria-label="close" color="inherit">
                    <Close />
                  </IconButton>,
                ]}
              />
            </Snackbar>,
          );
        }}
      >
        Warning
      </button>

      <button
        onClick={() => {
          count++;

          addSnackbar(
            <Snackbar autoClose={false}>
              <ErrorSnackbarContent
                message={`${count} HELLO SNACKBAR!`}
                action={[
                  <Button key="undo" color="inherit" size="small">
                    UNDO
                  </Button>,
                  <IconButton key="close" aria-label="close" color="inherit">
                    <Close />
                  </IconButton>,
                ]}
              />
            </Snackbar>,
          );
        }}
      >
        Error
      </button>

      <SnackbarContainer ref={snackbarContainer} />
    </Container>
  );
}

storiesOf('opt-components', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .addDecorator(storyFn => <SnackbarProvider>{storyFn()}</SnackbarProvider>)
  .add('<Snackbar>', () => <Basic />);

const Container = styled.div`
  position: relative;
  width: 700px;
  height: 400px;
  border: 1px solid white;
`;

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

```


### \_\_stories\_\_/Tooltip.stories.tsx


```tsx
import { withInsightViewerStorybookGlobalStyle } from '@lunit/insight-viewer';
import { Tooltip, withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { Error } from '@material-ui/icons';
import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

storiesOf('opt-components', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .add('Tooltip', () => {
    const title = (
      <div>
        <h1>Hello</h1>
        <p>World!!! World!!!</p>
      </div>
    );

    return (
      <>
        <Grid style={{ marginLeft: 170, marginTop: 150 }}>
          <Tooltip title={title} placement="top" open>
            <Error />
          </Tooltip>

          <Tooltip title={title} placement="right" open>
            <Error />
          </Tooltip>

          <Tooltip title={title} placement="left" open>
            <Error />
          </Tooltip>

          <Tooltip title={title} placement="bottom" open>
            <Error />
          </Tooltip>
        </Grid>

        <Grid style={{ marginLeft: 570, marginTop: 150 }}>
          <WarningTooltip title={title} placement="top" open>
            <Error style={{ color: 'red' }} />
          </WarningTooltip>

          <WarningTooltip title={title} placement="right" open>
            <Error style={{ color: 'red' }} />
          </WarningTooltip>

          <WarningTooltip title={title} placement="left" open>
            <Error style={{ color: 'red' }} />
          </WarningTooltip>

          <WarningTooltip title={title} placement="bottom" open>
            <Error style={{ color: 'red' }} />
          </WarningTooltip>
        </Grid>
      </>
    );
  });

const WarningTooltip = styled(Tooltip)`
  --tooltip-background-color: red;
  --tooltip-color: yellow;
`;

const Grid = styled.div`
  position: fixed;

  display: grid;
  grid-template-columns: 100px 100px;
  grid-template-rows: 100px 100px;
`;

```

<!-- importend -->